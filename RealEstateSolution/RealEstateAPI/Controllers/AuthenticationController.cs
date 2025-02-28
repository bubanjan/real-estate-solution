using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using RealEstateAPI.Entities;
using RealEstateAPI.Models;
using RealEstateAPI.Repositories;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace RealEstateAPI.Controllers
{
    [Route("api/authentication")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserRepository _userRepository;

        public class AuthenticationRequestBody
        {
            public string? UserName { get; set; }
            public string? Password { get; set; }
        }

        public AuthenticationController(IConfiguration configuration, IUserRepository userRepository)

        {
            _configuration = configuration;
            _userRepository = userRepository;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] AuthenticationRequestBody authenticationRequestBody)
        {
            var user = await ValidateUserCredentials(
                authenticationRequestBody.UserName,
                authenticationRequestBody.Password);

            if (user == null)
            {
                return Unauthorized();
            }

            var securityKey = new SymmetricSecurityKey(
                Encoding.ASCII.GetBytes(_configuration["Authentication:SecretForKey"]));
            var signingCredentials = new SigningCredentials(
                securityKey, SecurityAlgorithms.HmacSha256);

            var claimsForToken = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim("id", user.Id.ToString()),
                new Claim("username", user.UserName),
                new Claim("email", user.Email)
            };

            var jwtSecurityToken = new JwtSecurityToken(
                _configuration["Authentication:Issuer"],
                _configuration["Authentication:Audience"],
                claimsForToken,
                expires: DateTime.UtcNow.AddMonths(6),
                signingCredentials: signingCredentials);

            var tokenToReturn = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true, //HTTPS
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddMonths(6)
            };

            Response.Cookies.Append("jwt215ho", tokenToReturn, cookieOptions);

            return Ok(new { message = "Authenticated successfully" });
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt215ho");
            return Ok(new { message = "Logged out successfully" });
        }

        [Authorize]
        [HttpGet("check-user")]
        public IActionResult GetUserInfo()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var username = identity?.FindFirst("username")?.Value;

            if (username == null)
            {
                return Unauthorized(new { message = "Not authenticated" });
            }

            return Ok(new { username });
        }


        [HttpPost("register")]
        public async Task<ActionResult> RegisterUser(UserForCreationDto createUserModel)
        {
            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }

            var existingUserByUsername = await _userRepository.GetUserByUsernameAsync(createUserModel.UserName);
            var existingUserByEmail = await _userRepository.GetUserByEmailAsync(createUserModel.Email);

            if (existingUserByUsername != null)
            {
                return BadRequest("Username already exists.");
            }

            if (existingUserByEmail != null)
            {
                return BadRequest("Email already exists.");
            }

            string passwordSalt = BCrypt.Net.BCrypt.GenerateSalt();
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(createUserModel.Password, passwordSalt);

            var newUser = new User
            {
                UserName = createUserModel.UserName,
                Email = createUserModel.Email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };

            _userRepository.AddUser(newUser);
            await _userRepository.SaveChangesAsync();

            return Ok("User created successfully.");
        }

        private async Task<UserDto?> ValidateUserCredentials(string? userName, string? password)
        {
            User user = await _userRepository.GetUserByUsernameAsync(userName);

            if (user == null)
            {
                return null;
            }

            if (BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                var userDto = new UserDto
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Email = user.Email
                };

                return userDto;
            }
            return null;
        }
    }
}
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
        private readonly ILogger<AuthenticationController> _logger;

        public class AuthenticationRequestBody
        {
            public string? UserName { get; set; }
            public string? Password { get; set; }
        }

        public AuthenticationController(IConfiguration configuration, IUserRepository userRepository, ILogger<AuthenticationController> logger)
        {
            _configuration = configuration;
            _userRepository = userRepository;
            _logger = logger;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] AuthenticationRequestBody authenticationRequestBody)
        {
            try
            {
                var user = await ValidateUserCredentials(
                    authenticationRequestBody.UserName,
                    authenticationRequestBody.Password);

                if (user == null)
                {
                    _logger.LogWarning("Authentication failed for user (unauthorized): {UserName}", authenticationRequestBody.UserName);
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
                    new Claim("email", user.Email),
                    new Claim(ClaimTypes.Role, user.Role)
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

                var expirationDate = jwtSecurityToken.ValidTo;
                Response.Cookies.Append("jwt215ho", tokenToReturn, cookieOptions);

                _logger.LogInformation("User {UserName} authenticated successfully.", user.UserName);
                return Ok(new { message = "Authenticated successfully", expires = expirationDate });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during authentication for user: {UserName}", authenticationRequestBody.UserName);
                return StatusCode(500, "An error occurred during authentication.");
            }
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
                _logger.LogWarning("Attempt to access user info without a valid username claim.");
                return Unauthorized(new { message = "Not authenticated" });
            }

            _logger.LogInformation("User info retrieved for: {UserName}", username);
            return Ok(new { username });
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("register")]
        public async Task<ActionResult> RegisterUser(UserForCreationDto createUserModel)
        {
            if (ModelState.IsValid == false)
            {
                _logger.LogWarning("Registration failed - invalid model state.");
                return BadRequest(ModelState);
            }

            var existingUserByUsername = await _userRepository.GetUserByUsernameAsync(createUserModel.UserName);
            if (existingUserByUsername != null)
            {
                _logger.LogWarning("Registration failed - username already exists: {UserName}", createUserModel.UserName);
                return BadRequest("Username already exists.");
            }

            var existingUserByEmail = await _userRepository.GetUserByEmailAsync(createUserModel.Email);
            if (existingUserByEmail != null)
            {
                _logger.LogWarning("Registration failed - email already exists: {Email}", createUserModel.Email);
                return BadRequest("Email already exists.");
            }

            string passwordSalt = BCrypt.Net.BCrypt.GenerateSalt();
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(createUserModel.Password, passwordSalt);

            var newUser = new User
            {
                UserName = createUserModel.UserName,
                Email = createUserModel.Email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Role = createUserModel.Role ?? "Agent"
            };

            _userRepository.AddUser(newUser);
            await _userRepository.SaveChangesAsync();

            _logger.LogInformation("User registered successfully: {UserName}", createUserModel.UserName);
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
                    Email = user.Email,
                    Role = user.Role,
                };

                return userDto;
            }
            return null;
        }
    }
}
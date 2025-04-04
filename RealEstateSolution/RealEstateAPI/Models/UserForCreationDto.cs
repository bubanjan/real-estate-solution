using System.ComponentModel.DataAnnotations;

namespace RealEstateAPI.Models
{
    public class UserForCreationDto
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
        [Required]
        public string Role { get; set; } = "Seller";
    }
}
using RealEstateAPI.Enums;
using System.ComponentModel.DataAnnotations;

namespace RealEstateAPI.Models
{
    public class EstateForCreationDto
    {
        [Required]
        [MaxLength(300)]
        public string Title { get; set; }

        [MaxLength(2500)]
        public string? Description { get; set; }

        public int? Price { get; set; }

        [Required(ErrorMessage = "You should provide size value")]
        [Range(1, 100000, ErrorMessage = "Size must be between 1 and 100 000 square meters.")]
        public int? Size { get; set; }

        public EstateType EstateCategory { get; set; }

        [MaxLength(300)]
        public string? SellerContact { get; set; }

        public City City { get; set; }

        public List<int> TagIds { get; set; } = new List<int>();
        public List<string> ImageUrls { get; set; } = new List<string>();
    }
}
using RealEstateAPI.Enums;
using System.ComponentModel.DataAnnotations;

namespace RealEstateAPI.Models
{
    public class EstateForUpdateDto
    {
        public string? Description { get; set; }

        [Required]
        public string Title { get; set; }
        public int? Price { get; set; }

        [Required(ErrorMessage = "You should provide size value")]
        [Range(1, int.MaxValue, ErrorMessage = "Size must be greater than 0.")]
        public int? Size { get; set; }

        public EstateType EstateCategory { get; set; }
        public string? SellerContact { get; set; }

        public City City { get; set; }
    }
}
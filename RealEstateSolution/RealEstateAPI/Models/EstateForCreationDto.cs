using RealEstateAPI.Enums;
using System.ComponentModel.DataAnnotations;

namespace RealEstateAPI.Models
{
    public class EstateForCreationDto
    {
        public string? Description { get; set; }
        public int? Price { get; set; }

        [Required(ErrorMessage = "You should provide size value")]
        public int Size { get; set; }

        public EstateType EstateCategory { get; set; }
        public string? SellerContact { get; set; }
    }
}
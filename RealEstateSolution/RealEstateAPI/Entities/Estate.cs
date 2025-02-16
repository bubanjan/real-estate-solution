using RealEstateAPI.Enums;
using System.ComponentModel.DataAnnotations;

namespace RealEstateAPI.Entities
{
    public class Estate
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int? Price { get; set; }
        public int Size { get; set; }
        public EstateType EstateCategory { get; set; }
        public string? SellerContact { get; set; }
        public City City { get; set; }
    }
}
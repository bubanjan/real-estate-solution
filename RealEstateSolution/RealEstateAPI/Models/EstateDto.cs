using RealEstateAPI.Enums;

namespace RealEstateAPI.Models
{
    public class EstateDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public int? Price { get; set; }
        public int Size { get; set; }
        public EstateType EstateCategory { get; set; }
        public City City { get; set; }
    }
}
using System.ComponentModel.DataAnnotations;

namespace RealEstateAPI.Entities
{
    public class Tag
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        public ICollection<Estate> Estates { get; set; } = new List<Estate>();
    }
}
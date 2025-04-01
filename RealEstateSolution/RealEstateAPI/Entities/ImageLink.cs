using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RealEstateAPI.Entities
{
    public class ImageLink
    {
        [Key]
        public int Id { get; set; }

        public string Url { get; set; }

        public int EstateId { get; set; }

        [ForeignKey(nameof(EstateId))]
        public Estate Estate { get; set; }
    }
}
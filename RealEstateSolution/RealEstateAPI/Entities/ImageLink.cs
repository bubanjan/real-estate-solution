namespace RealEstateAPI.Entities
{
    public class ImageLink
    {
        public int Id { get; set; }
        public string Url { get; set; }

        public int EstateId { get; set; }
        public Estate Estate { get; set; }
    }
}
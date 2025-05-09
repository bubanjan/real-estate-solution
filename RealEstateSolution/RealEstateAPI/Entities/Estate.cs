﻿using RealEstateAPI.Enums;
using System.ComponentModel.DataAnnotations;

namespace RealEstateAPI.Entities
{
    public class Estate
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(300)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(2500)]
        public string? Description { get; set; }

        public int? Price { get; set; }
        public int Size { get; set; }
        public EstateType EstateCategory { get; set; }

        [MaxLength(300)]
        public string? SellerContact { get; set; }

        public City City { get; set; }

        public ICollection<Tag> Tags { get; set; } = new List<Tag>();
        public ICollection<ImageLink> ImageLinks { get; set; } = new List<ImageLink>();
    }
}
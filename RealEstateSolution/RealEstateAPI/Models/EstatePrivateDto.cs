﻿using RealEstateAPI.Enums;
using RealEstateAPI.Interfaces;

namespace RealEstateAPI.Models
{
    public class EstatePrivateDto : IEstateDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public int? Price { get; set; }
        public int Size { get; set; }
        public EstateType EstateCategory { get; set; }
        public City City { get; set; }

        public List<TagDto> Tags { get; set; } = new List<TagDto>();
        public List<ImageLinkDto> ImageLinks { get; set; } = new List<ImageLinkDto>();
        public string? SellerContact { get; set; }
    }
}
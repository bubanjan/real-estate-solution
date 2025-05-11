using RealEstateAPI.Entities;
using RealEstateAPI.Models;
using System.Linq.Expressions;

namespace RealEstateAPI.Mappers
{
    public static class EstateMapper
    {
        public static Expression<Func<Estate, EstatePublicDto>> ToEstatePublicDto()
        {
            return o => new EstatePublicDto
            {
                Id = o.Id,
                Description = o.Description,
                Title = o.Title,
                EstateCategory = o.EstateCategory,
                Price = o.Price,
                Size = o.Size,
                City = o.City,

                Tags = o.Tags
                    .Select(t => new TagDto
                    {
                        Id = t.Id,
                        Name = t.Name
                    })
                    .ToList(),

                ImageLinks = o.ImageLinks
                    .Select(il => new ImageLinkDto
                    {
                        Id = il.Id,
                        Url = il.Url
                    })
                    .ToList()
            };
        }

        public static Expression<Func<Estate, EstatePrivateDto>> ToEstatePrivateDto()
        {
            return o => new EstatePrivateDto
            {
                Id = o.Id,
                Description = o.Description,
                Title = o.Title,
                EstateCategory = o.EstateCategory,
                Price = o.Price,
                Size = o.Size,
                City = o.City,

                Tags = o.Tags
                    .Select(t => new TagDto
                    {
                        Id = t.Id,
                        Name = t.Name
                    })
                    .ToList(),

                ImageLinks = o.ImageLinks
                    .Select(il => new ImageLinkDto
                    {
                        Id = il.Id,
                        Url = il.Url
                    })
                    .ToList(),
                SellerContact = o.SellerContact
            };
        }

        public static EstatePublicDto MapToEstatePublicDto(Estate estate)
        {
            return new EstatePublicDto
            {
                Id = estate.Id,
                Description = estate.Description,
                Price = estate.Price,
                Size = estate.Size,
                EstateCategory = estate.EstateCategory,
                City = estate.City,
                Title = estate.Title,

                Tags = estate.Tags
                    .Select(t => new TagDto
                    {
                        Id = t.Id,
                        Name = t.Name
                    })
                    .ToList(),

                ImageLinks = estate.ImageLinks
                    .Select(il => new ImageLinkDto
                    {
                        Id = il.Id,
                        Url = il.Url
                    })
                    .ToList()
            };
        }

        public static EstatePrivateDto MapToPrivateDto(Estate estate)
        {
            return new EstatePrivateDto
            {
                Id = estate.Id,
                Description = estate.Description,
                Price = estate.Price,
                Size = estate.Size,
                EstateCategory = estate.EstateCategory,
                City = estate.City,
                Title = estate.Title,

                Tags = estate.Tags
                    .Select(t => new TagDto
                    {
                        Id = t.Id,
                        Name = t.Name
                    })
                    .ToList(),

                ImageLinks = estate.ImageLinks
                    .Select(il => new ImageLinkDto
                    {
                        Id = il.Id,
                        Url = il.Url
                    })
                    .ToList(),
                SellerContact = estate.SellerContact,
            };
        }

        public static Estate MapToEstate(EstateForCreationDto estateForCreationDto)
        {
            return new Estate
            {
                Description = estateForCreationDto.Description,
                Price = estateForCreationDto.Price,
                Size = estateForCreationDto.Size ?? 0,
                EstateCategory = estateForCreationDto.EstateCategory,
                City = estateForCreationDto.City,
                Title = estateForCreationDto.Title,
                SellerContact = estateForCreationDto?.SellerContact,
            };
        }

        public static void UpdateEstate(Estate estate, EstateForUpdateDto estateUpdateData)
        {
            estate.Description = estateUpdateData.Description ?? estate.Description;
            estate.Title = estateUpdateData.Title ?? estate.Title;
            estate.Price = estateUpdateData.Price ?? estate.Price;
            estate.EstateCategory = estateUpdateData.EstateCategory;
            estate.City = estateUpdateData.City;
            estate.SellerContact = estateUpdateData.SellerContact ?? estate.SellerContact;
            estate.Size = estateUpdateData.Size ?? 0;
        }
    }
}
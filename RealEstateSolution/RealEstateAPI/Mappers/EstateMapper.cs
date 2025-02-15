using RealEstateAPI.Entities;
using RealEstateAPI.Models;
using System.Linq.Expressions;

namespace RealEstateAPI.Mappers
{
    public static class EstateMapper
    {
        public static Expression<Func<Estate, EstateDto>> ToEstateDto()
        {
            return o => new EstateDto
            {
                Id = o.Id,
                Description = o.Description,
                EstateCategory = o.EstateCategory,
                Price = o.Price,
                Size = o.Size,
            };
        }

        public static EstateDto MapToEstateDto(Estate estateForCreationDto)
        {
            return new EstateDto
            {
                Id = estateForCreationDto.Id,
                Description = estateForCreationDto.Description,
                Price = estateForCreationDto.Price,
                Size = estateForCreationDto.Size,
                EstateCategory = estateForCreationDto.EstateCategory,
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
            };
        }
    }
}
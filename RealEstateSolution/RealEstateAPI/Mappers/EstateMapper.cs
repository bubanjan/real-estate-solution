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
    }
}
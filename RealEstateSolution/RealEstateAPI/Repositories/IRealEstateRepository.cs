using RealEstateAPI.Entities;
using RealEstateAPI.Models;

namespace RealEstateAPI.Repositories
{
    public interface IRealEstateRepository
    {
        Task<IEnumerable<EstateDto>> GetEstatesAsync();

        Task<EstateDto?> GetEstateAsync(int estateId);

        Task<Estate?> GetEstateEntityAsync(int estateId);

        Task<bool> SaveChangesAsync();

        Task<bool> DeleteEstateAsync(int estateId);

        Task AddEstateAsync(Estate estate);
    }
}
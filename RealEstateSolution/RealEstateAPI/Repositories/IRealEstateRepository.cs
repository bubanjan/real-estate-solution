using RealEstateAPI.Entities;

namespace RealEstateAPI.Repositories
{
    public interface IRealEstateRepository
    {
        Task<IEnumerable<Estate>> GetEstatesAsync();
    }
}
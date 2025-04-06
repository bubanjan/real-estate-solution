using RealEstateAPI.Entities;
using RealEstateAPI.Enums;
using RealEstateAPI.Models;

namespace RealEstateAPI.Repositories
{
    public interface IRealEstateRepository
    {
        Task<(IEnumerable<EstateDto>, PaginationMetadata)> GetEstatesAsync(EstateType? estateCategory, City? city, int? minPrice, int? maxPrice, int? minSize, int? maxSize, int pageNumber, int pageSize, string? searchWord);

        Task<EstateDto?> GetEstateAsync(int estateId);

        Task<Estate?> GetEstateEntityAsync(int estateId);

        Task SaveChangesAsync();

        Task<bool> DeleteEstateAsync(int estateId);

        Task AddEstateAsync(Estate estate);

        Task<List<Tag>> GetTagsByIdsAsync(IEnumerable<int> tagIds);

        Task RemoveImageLinksByEstateIdAsync(int estateId);

        Task RemoveTagsFromEstateAsync(int estateId);
    }
}
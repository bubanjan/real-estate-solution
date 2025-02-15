using Microsoft.EntityFrameworkCore;
using RealEstateAPI.DbContexts;
using RealEstateAPI.Mappers;
using RealEstateAPI.Models;

namespace RealEstateAPI.Repositories
{
    public class RealEstateRepository : IRealEstateRepository
    {
        private readonly RealEstateDbContext _context;

        public RealEstateRepository(RealEstateDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<EstateDto>> GetEstatesAsync()
        {
            return await _context.Estates
                          .Select(EstateMapper.ToEstateDto())
                          .ToListAsync();
        }

        public async Task<EstateDto?> GetEstateAsync(int estateId)
        {
            return await _context.Estates
                          .Where(x => x.Id == estateId)
                          .Select(EstateMapper.ToEstateDto())
                          .FirstOrDefaultAsync();
        }
    }
}
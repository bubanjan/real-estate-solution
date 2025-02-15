using Microsoft.EntityFrameworkCore;
using RealEstateAPI.DbContexts;
using RealEstateAPI.Entities;

namespace RealEstateAPI.Repositories
{
    public class RealEstateRepository : IRealEstateRepository
    {
        private readonly RealEstateDbContext _context;

        public RealEstateRepository(RealEstateDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Estate>> GetEstatesAsync()
        {
            return await _context.Estates.ToListAsync();
        }
    }
}
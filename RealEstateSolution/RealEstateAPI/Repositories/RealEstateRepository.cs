using Microsoft.EntityFrameworkCore;
using RealEstateAPI.DbContexts;
using RealEstateAPI.Entities;
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

        public async Task<Estate?> GetEstateEntityAsync(int estateId)
        {
            return await _context.Estates
                          .Where(x => x.Id == estateId)
                          .FirstOrDefaultAsync();
        }

        public async Task<bool> DeleteEstateAsync(int estateId)
        {
            var estate = await _context.Estates.FirstOrDefaultAsync(e => e.Id == estateId);
            if (estate == null)
            {
                return false;
            };
            _context.Estates.Remove(estate);
            return true;
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync() >= 0);
        }

        public async Task AddEstateAsync(Estate estate)
        {
            await _context.Estates.AddAsync(estate);
        }
    }
}
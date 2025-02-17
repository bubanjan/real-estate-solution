﻿using Microsoft.EntityFrameworkCore;
using RealEstateAPI.DbContexts;
using RealEstateAPI.Entities;
using RealEstateAPI.Enums;
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

        public async Task<(IEnumerable<EstateDto>, PaginationMetadata)> GetEstatesAsync(EstateType? estateCategory, City? city, int? minPrice, int? maxPrice, int? minSize, int? maxSize, int pageNumber, int pageSize)
        {
            var collection = _context.Estates.AsQueryable();

            if (estateCategory != null)
            {
                collection = collection.Where(x => x.EstateCategory == estateCategory);
            }

            if (city != null)
            {
                collection = collection.Where(x => x.City == city);
            }

            if (minPrice != null)
            {
                collection = collection.Where(x => x.Price >= minPrice);
            }

            if (maxPrice != null)
            {
                collection = collection.Where(x => x.Price <= maxPrice);
            }

            if (minSize != null)
            {
                collection = collection.Where(x => x.Size >= minSize);
            }

            if (maxSize != null)
            {
                collection = collection.Where(x => x.Size <= maxSize);
            }

            var totalItemsCount = await collection.CountAsync();

            var paginationMetaData = new PaginationMetadata(totalItemsCount, pageSize, pageNumber);

            var collectionToReturn = await collection.OrderBy(o => o.Price)
                .Skip(pageSize * (pageNumber - 1))
                .Take(pageSize)
                .Select(EstateMapper.ToEstateDto())
                .ToListAsync();

            return (collectionToReturn, paginationMetaData);
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
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

        public async Task<(IEnumerable<object>, PaginationMetadata)> GetEstatesAsync(EstateType? estateCategory, City? city, int? minPrice, int? maxPrice, int? minSize, int? maxSize, int pageNumber, int pageSize, string? searchWord, EstatesOrderBy? orderBy, bool userIsAuthenticated)
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

            if (string.IsNullOrEmpty(searchWord) == false)
            {
                collection = collection.Where(x => x.Description != null && x.Description.ToLower().Contains(searchWord.ToLower()));
            }

            var totalItemsCount = await collection.CountAsync();

            var paginationMetaData = new PaginationMetadata(totalItemsCount, pageSize, pageNumber);

            collection = (orderBy ?? EstatesOrderBy.PriceAsc) switch
            {
                EstatesOrderBy.PriceAsc => collection.OrderBy(e => e.Price),
                EstatesOrderBy.PriceDesc => collection.OrderByDescending(e => e.Price),
                EstatesOrderBy.SizeAsc => collection.OrderBy(e => e.Size),
                EstatesOrderBy.SizeDesc => collection.OrderByDescending(e => e.Size),
                _ => collection.OrderBy(e => e.Price)
            };

            var collectionToReturn = userIsAuthenticated
                ? await collection
                    .Skip(pageSize * (pageNumber - 1))
                    .Take(pageSize)
                    .Select(EstateMapper.ToEstatePrivateDto())
                    .ToListAsync<object>()
                : await collection
                    .Skip(pageSize * (pageNumber - 1))
                    .Take(pageSize)
                    .Select(EstateMapper.ToEstatePublicDto())
                    .ToListAsync<object>();

            return (collectionToReturn, paginationMetaData);
        }

        public async Task<EstatePublicDto?> GetEstateAsync(int estateId)
        {
            return await _context.Estates
                          .Where(x => x.Id == estateId)
                          .Select(EstateMapper.ToEstatePublicDto())
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

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task AddEstateAsync(Estate estate)
        {
            await _context.Estates.AddAsync(estate);
        }

        public async Task<List<Tag>> GetTagsByIdsAsync(IEnumerable<int> tagIds)
        {
            return await _context.Tags
                .Where(t => tagIds.Contains(t.Id))
                .ToListAsync();
        }

        public async Task RemoveImageLinksByEstateIdAsync(int estateId)
        {
            var existingImages = await _context.ImageLinks
                .Where(il => il.EstateId == estateId)
                .ToListAsync();

            _context.ImageLinks.RemoveRange(existingImages);
        }

        public async Task RemoveTagsFromEstateAsync(int estateId)
        {
            var estate = await _context.Estates
                .Include(e => e.Tags)
                .FirstOrDefaultAsync(e => e.Id == estateId);

            if (estate != null)
            {
                estate.Tags.Clear();
            }
        }
    }
}
﻿using RealEstateAPI.Models;

namespace RealEstateAPI.Repositories
{
    public interface IRealEstateRepository
    {
        Task<IEnumerable<EstateDto>> GetEstatesAsync();
    }
}
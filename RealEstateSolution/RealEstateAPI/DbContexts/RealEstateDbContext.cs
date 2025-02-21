using Microsoft.EntityFrameworkCore;
using RealEstateAPI.Entities;

namespace RealEstateAPI.DbContexts
{
    public class RealEstateDbContext : DbContext
    {
        public RealEstateDbContext(DbContextOptions<RealEstateDbContext> options) : base(options)
        {
        }

        public DbSet<Estate> Estates { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
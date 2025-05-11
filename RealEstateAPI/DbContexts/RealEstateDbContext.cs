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
        public DbSet<Tag> Tags { get; set; }
        public DbSet<ImageLink> ImageLinks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Estate>()
                .HasMany(e => e.Tags)
                .WithMany(t => t.Estates)
                .UsingEntity(j => j.ToTable("EstateTags"));

            modelBuilder.Entity<Tag>().HasData(
                new Tag { Id = 1, Name = "SeaView" },
                new Tag { Id = 2, Name = "NewBuild" },
                new Tag { Id = 3, Name = "HasParking" }
            );

            modelBuilder.Entity<ImageLink>()
                .HasOne(il => il.Estate)
                .WithMany(re => re.ImageLinks)
                .HasForeignKey(il => il.EstateId);
        }
    }
}
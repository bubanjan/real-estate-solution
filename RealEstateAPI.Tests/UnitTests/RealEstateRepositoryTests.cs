using Microsoft.EntityFrameworkCore;
using RealEstateAPI.DbContexts;
using RealEstateAPI.Entities;
using RealEstateAPI.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RealEstateAPI.Tests.UnitTests
{
    public class RealEstateRepositoryTests
    {
        private RealEstateDbContext GetInMemoryDbContext()
        {
            var options = new DbContextOptionsBuilder<RealEstateDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            return new RealEstateDbContext(options);
        }

        [Fact]
        public async Task AddEstate_ShouldAddEstateToDatabase()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var repo = new RealEstateRepository(context);

            var estate = new Estate
            {
                Title = "Sample",
                Price = 100000,
                Size = 80,
                Description = "Test Estate"
            };

            // Act
            await repo.AddEstateAsync(estate);
            await repo.SaveChangesAsync();

            // Assert
            var estates = await context.Estates.ToListAsync();
            Assert.Single(estates);
            Assert.Equal("Sample", estates[0].Title);
        }
    }
}

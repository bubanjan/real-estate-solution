using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging.Abstractions;
using NSubstitute;
using RealEstateAPI.Controllers;
using RealEstateAPI.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RealEstateAPI.Tests.UnitTests
{
    public class EstatesControllerTests
    {
        [Fact]
        public async Task CreateEstate_ReturnsBadRequest_WhenModelIsNull()
        {
            // Arrange
            var repo = Substitute.For<IRealEstateRepository>();
            var controller = new EstatesController(repo, NullLogger<EstatesController>.Instance);

            // Act
            var result = await controller.CreateEstate(null);

            // Assert
            var badRequest = Assert.IsType<BadRequestObjectResult>(result.Result);
            Assert.Equal("Estate creation data cannot be null.", badRequest.Value);
        }
    }
}

using Microsoft.AspNetCore.Mvc.Testing;
using RealEstateAPI.Models;
using System.Collections.Generic;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Xunit;
using Xunit.Abstractions;

namespace RealEstateAPI.Tests.Integration
{
    public class CreateAndGetEstateTests : IClassFixture<CustomWebApplicationFactory>
    {
        private readonly HttpClient _client;
        private readonly ITestOutputHelper _output;

        public CreateAndGetEstateTests(CustomWebApplicationFactory factory, ITestOutputHelper output)
        {
            _client = factory.CreateClient(new WebApplicationFactoryClientOptions
            {
                AllowAutoRedirect = false
            });

            _output = output;
        }

        [Fact]
        public async Task CreateEstate_ThenGetById_ShouldReturnCreatedEstate()
        {
            // Arrange
            var estateToCreate = new EstateForCreationDto
            {
                Title = "Integration Test Estate",
                Description = "Test description",
                Price = 250000,
                Size = 90,
                City = RealEstateAPI.Enums.City.Bar,
                EstateCategory = RealEstateAPI.Enums.EstateType.Apartment,
                ImageUrls = new List<string>(),
                TagIds = new List<int>()
            };

            // Act
            var postResponse = await _client.PostAsJsonAsync("/api/estates", estateToCreate);
            var errorContent = await postResponse.Content.ReadAsStringAsync();
            _output.WriteLine("POST /api/estates response: " + errorContent);
            postResponse.EnsureSuccessStatusCode();

            var createdEstate = await postResponse.Content.ReadFromJsonAsync<EstatePublicDto>(
                new System.Text.Json.JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true,
                    Converters = { new System.Text.Json.Serialization.JsonStringEnumConverter() }
                });

            // Assert
            Assert.NotNull(createdEstate);
            Assert.Equal("Integration Test Estate", createdEstate.Title);
            Assert.True(createdEstate.Id > 0);

            // Act
            var getResponse = await _client.GetAsync($"/api/estates/{createdEstate.Id}");
            var getContent = await getResponse.Content.ReadAsStringAsync();
            _output.WriteLine("GET /api/estates/{id} response: " + getContent);
            getResponse.EnsureSuccessStatusCode();

            var fetchedEstate = await getResponse.Content.ReadFromJsonAsync<EstatePublicDto>(
                new System.Text.Json.JsonSerializerOptions
                {
                    Converters = { new System.Text.Json.Serialization.JsonStringEnumConverter() },
                    PropertyNameCaseInsensitive = true
                });


            // Assert
            Assert.NotNull(fetchedEstate);
            Assert.Equal(createdEstate.Id, fetchedEstate.Id);
            Assert.Equal("Integration Test Estate", fetchedEstate.Title);
        }
    }
}

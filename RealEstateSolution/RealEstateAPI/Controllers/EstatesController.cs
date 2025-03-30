using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RealEstateAPI.Entities;
using RealEstateAPI.Enums;
using RealEstateAPI.Mappers;
using RealEstateAPI.Models;
using RealEstateAPI.Repositories;
using System.Text.Json;

namespace RealEstateAPI.Controllers
{
    [Route("api/estates")]
    [ApiController]
    public class EstatesController : ControllerBase
    {
        private readonly IRealEstateRepository _realEstateRepository;
        private readonly ILogger<EstatesController> _logger;
        private const int maxPageSize = 20;

        public EstatesController(IRealEstateRepository realEstateRepository, ILogger<EstatesController> logger)
        {
            _realEstateRepository = realEstateRepository;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EstateDto>>> GetEstates(EstateType? estateCategory, City? city, int? minPrice, int? maxPrice, int? minSize, int? maxSize, int pageNumber = 1, int pageSize = 10)
        {
            if (pageNumber < 1 || pageSize < 1)
            {
                return BadRequest("Page number and page size must be positeve numbers.");
            }

            if (pageSize > maxPageSize)
            {
                pageSize = maxPageSize;
            }

            try
            {
                var (estateDtos, paginationMetadata) = await _realEstateRepository.GetEstatesAsync(estateCategory, city, minPrice, maxPrice, minSize, maxSize, pageNumber, pageSize);

                Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(paginationMetadata));

                return Ok(estateDtos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occured in GetEstates.");
                return StatusCode(500, "An unexpected error occured.Please try again later.");
            }
        }

        [HttpGet("{id}", Name = "GetEstate")]
        public async Task<ActionResult<EstateDto>> GetEstate(int id)
        {
            try
            {
                var estateDto = await _realEstateRepository.GetEstateAsync(id);
                if (estateDto == null)
                {
                    return NotFound();
                }

                return Ok(estateDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetEstate for ID {EstateId}", id);
                return StatusCode(500, "An unexpected error occured. Please try again later.");
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEstate(int id)
        {
            try
            {
                var isDeleted = await _realEstateRepository.DeleteEstateAsync(id);

                if (isDeleted == false)
                {
                    return NotFound();
                }

                await _realEstateRepository.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in DeleteEstate for ID {EstateId}", id);
                return StatusCode(500, "An unexpected error occurred. Please try again later.");
            }
        }

        [Authorize(Roles = "Admin,Agent")]
        [HttpPost]
        public async Task<ActionResult<EstateDto>> CreateEstate(EstateForCreationDto estateForCreation)
        {
            try
            {
                var estate = EstateMapper.MapToEstate(estateForCreation);

                if (estateForCreation.TagIds.Any())
                {
                    List<Tag> tags = await _realEstateRepository.GetTagsByIdsAsync(estateForCreation.TagIds);
                    estate.Tags = tags; ;
                }

                if (estateForCreation.ImageUrls.Any())
                {
                    var imageLinks = estateForCreation.ImageUrls
                        .Select(url => new ImageLink { Url = url })
                        .ToList();

                    estate.ImageLinks = imageLinks;
                }

                await _realEstateRepository.AddEstateAsync(estate);
                await _realEstateRepository.SaveChangesAsync();

                var estateToReturn = EstateMapper.MapToEstateDto(estate);

                return CreatedAtRoute("GetEstate", new { id = estateToReturn.Id }, estateToReturn);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in CreateEstate");
                return StatusCode(500, "An unexpected error occurred. Please try again later.");
            }
        }

        [Authorize(Roles = "Admin,Agent")]
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateEstate(int id, EstateForUpdateDto estateData)
        {
            if (estateData == null)
            {
                return BadRequest("Estate update data cannot be null.");
            }

            try
            {
                var estateEntity = await _realEstateRepository.GetEstateEntityAsync(id);

                if (estateEntity == null)
                {
                    return NotFound();
                }

                EstateMapper.UpdateEstate(estateEntity, estateData);

                await _realEstateRepository.RemoveTagsFromEstateAsync(id);
                await _realEstateRepository.SaveChangesAsync();

                if (estateData.TagIds != null && estateData.TagIds.Any())
                {
                    var tags = await _realEstateRepository.GetTagsByIdsAsync(estateData.TagIds);
                    foreach (var tag in tags)
                    {
                        estateEntity.Tags.Add(tag);
                    }
                }

                await _realEstateRepository.RemoveImageLinksByEstateIdAsync(id);
                await _realEstateRepository.SaveChangesAsync();

                if (estateData.ImageUrls != null && estateData.ImageUrls.Any())
                {
                    foreach (var url in estateData.ImageUrls)
                    {
                        estateEntity.ImageLinks.Add(new ImageLink
                        {
                            Url = url,
                        });
                    }
                }

                await _realEstateRepository.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in UpdateEstate for ID {EstateId}", id);
                return StatusCode(500, "An unexpected error occurred. Please try again later.");
            }
        }

    }
}
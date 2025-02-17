using Microsoft.AspNetCore.Mvc;
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
        private const int maxPageSize = 20;

        public EstatesController(IRealEstateRepository realEstateRepository)
        {
            _realEstateRepository = realEstateRepository;
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
                //TO DO:_logger.LogError(ex, "An unexpected error occured in GetEstates.")
                return StatusCode(500, "An unexpected error occured.Please try again later.");
            }
        }

        [HttpGet("{id}", Name = "GetEstate")]
        public async Task<ActionResult<EstateDto>> GetEstate(int id)
        {
            // try { } catch (Exception ex) { }
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
                //_logger.LogError(ex, "Error in GetEstate for ID {EstateId}", id);
                return StatusCode(500, "An unexpected error occured. Please try again later.");
            }
        }

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
                //_logger.LogError(ex, "Error in DeleteEstate for ID {EstateId}", id);
                return StatusCode(500, "An unexpected error occurred. Please try again later.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<EstateDto>> CreateEstate(EstateForCreationDto estateForCreation)
        {
            try
            {
                var estate = EstateMapper.MapToEstate(estateForCreation);
                await _realEstateRepository.AddEstateAsync(estate);
                await _realEstateRepository.SaveChangesAsync();

                var estateToReturn = EstateMapper.MapToEstateDto(estate);

                return CreatedAtRoute("GetEstate", new { id = estateToReturn.Id }, estateToReturn);
            }
            catch (Exception ex)
            {
                //_logger.LogError(ex, "Error in CreateEstate");
                return StatusCode(500, "An unexpected error occurred. Please try again later.");
            }
        }

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
                await _realEstateRepository.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                //_logger.LogError(ex, "Error in UpdateEstate for ID {EstateId}", id);
                return StatusCode(500, "An unexpected error occurred. Please try again later.");
            }
        }
    }
}
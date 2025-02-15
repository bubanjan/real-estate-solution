using Microsoft.AspNetCore.Mvc;
using RealEstateAPI.Mappers;
using RealEstateAPI.Models;
using RealEstateAPI.Repositories;

namespace RealEstateAPI.Controllers
{
    [Route("api/estates")]
    [ApiController]
    public class EstatesController : ControllerBase
    {
        private readonly IRealEstateRepository _realEstateRepository;

        public EstatesController(IRealEstateRepository realEstateRepository)
        {
            _realEstateRepository = realEstateRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EstateDto>>> GetEstates()
        {
            var estateDtos = await _realEstateRepository.GetEstatesAsync();
            return Ok(estateDtos);
        }

        [HttpGet("{id}", Name = "GetEstate")]
        public async Task<ActionResult<EstateDto>> GetEstate(int id)
        {
            var estateDto = await _realEstateRepository.GetEstateAsync(id);
            if (estateDto == null)
            {
                return NotFound();
            }

            return Ok(estateDto);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEstate(int id)
        {
            var isDeleted = await _realEstateRepository.DeleteEstateAsync(id);

            if (isDeleted == false)
            {
                return NotFound();
            }

            await _realEstateRepository.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<EstateDto>> CreateEstate(EstateForCreationDto estateForCreation)
        {
            var estate = EstateMapper.MapToEstate(estateForCreation);
            await _realEstateRepository.AddEstateAsync(estate);
            await _realEstateRepository.SaveChangesAsync();

            var estateToReturn = EstateMapper.MapToEstateDto(estate);

            return CreatedAtRoute("GetEstate", new { id = estateToReturn.Id }, estateToReturn);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateEstate(int id, EstateForUpdateDto estateData)
        {
            if (estateData == null)
            {
                return BadRequest("Estate update data cannot be null.");
            }

            var estateEntity = await _realEstateRepository.GetEstateEntityAsync(id);

            if (estateEntity == null)
            {
                return NotFound();
            }

            EstateMapper.UpdateEstate(estateEntity, estateData);

            await _realEstateRepository.SaveChangesAsync();

            return NoContent();
        }
    }
}
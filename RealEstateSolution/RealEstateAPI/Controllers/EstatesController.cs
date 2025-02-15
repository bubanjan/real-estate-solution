using Microsoft.AspNetCore.Mvc;
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

        [HttpGet("{id}")]
        public async Task<ActionResult<EstateDto>> GetEstate(int id)
        {
            var estateDto = await _realEstateRepository.GetEstateAsync(id);
            if (estateDto == null)
            {
                return NotFound();
            }

            return Ok(estateDto);
        }
    }
}
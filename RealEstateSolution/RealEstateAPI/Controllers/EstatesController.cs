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
    }
}
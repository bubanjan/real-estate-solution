using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealEstateAPI.DbContexts;
using RealEstateAPI.Entities;

namespace RealEstateAPI.Controllers
{
    [Route("api/tags")]
    [ApiController]
    public class TagsController : ControllerBase
    {
        private readonly RealEstateDbContext _context;
        private readonly ILogger<TagsController> _logger;

        public TagsController(RealEstateDbContext context, ILogger<TagsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tag>>> GetTags()
        {
            try
            {
                var tags = await _context.Tags.ToListAsync();
                return Ok(tags);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving tags.");
                return StatusCode(500, "An error occurred while retrieving tags.");
            }
        }
    }
}
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

        public TagsController(RealEstateDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tag>>> GetTags()
        {
            var tags = await _context.Tags.ToListAsync();
            return Ok(tags);
        }
    }
}
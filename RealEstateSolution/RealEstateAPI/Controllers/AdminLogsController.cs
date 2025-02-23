using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace RealEstateAPI.Controllers
{
    [Authorize]
    [Route("api/admin/logs")]
    [ApiController]
    public class AdminLogsController : ControllerBase
    {
        private const string LogsDirectory = "logs";

        [HttpGet]
        public IActionResult GetLogs()
        {
            var logFiles = Directory.GetFiles(LogsDirectory, "log*.txt")
                                    .OrderByDescending(f => f)
                                    .ToList();

            if (!logFiles.Any())
            {
                return NotFound(new { message = "No log files found." });
            }

            string latestLogFile = logFiles.First();

            string logs;
            using (var stream = new FileStream(latestLogFile, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
            using (var reader = new StreamReader(stream))
            {
                logs = reader.ReadToEnd();
            }

            string safeLogs = System.Net.WebUtility.HtmlEncode(logs);

            return Ok(new { fileName = Path.GetFileName(latestLogFile), content = safeLogs });
        }
    }

}
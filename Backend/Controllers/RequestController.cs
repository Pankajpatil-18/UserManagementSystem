using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RequestController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public RequestController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpPost("submit")]
        public async Task<IActionResult> SubmitRequest([FromBody] Requests request)
        {
            if (request == null)
            {
                return BadRequest("Request data is null.");
            }

            // Set default status and date
            request.Status = "Pending";
            request.Date = DateTime.Now;

            _dataContext.Requests.Add(request);
            await _dataContext.SaveChangesAsync();

            return Ok(request);
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserRequests(int userId)
        {
            var requests = await _dataContext.Requests
                .Where(r => r.UserId == userId)
                .ToListAsync();

            return Ok(requests);
        }
    }
}

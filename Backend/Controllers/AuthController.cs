using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;

using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;


namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly DataContext Dbcontext;

        public AuthController(DataContext context)
        {
            Dbcontext = context;
        }

        [HttpGet("GetCurrentTime")]
        public async Task<IActionResult> GetCurrentTime()
        {
            string currentTime;

            using (var connection = new SqlConnection(Dbcontext.Database.GetConnectionString()))
            {
                try
                {
                    await connection.OpenAsync();
                    using (var command = new SqlCommand("SELECT GETDATE()", connection))
                    {
                        var result = await command.ExecuteScalarAsync();
                        currentTime = result?.ToString();
                    }
                }
                catch (Exception ex)
                {
                    return StatusCode(500, $"Internal server error: {ex.Message}");
                }
            }

            return Ok(new { Time = currentTime });
        }

        
    }
}

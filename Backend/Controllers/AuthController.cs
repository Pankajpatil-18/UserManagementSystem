using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;

using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;

using Backend.Models;
using Backend.Dtos;


namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly DataContext Dbcontext;
        private readonly IRepository _Repository;
 
        

        public AuthController(DataContext context,IRepository Repository)
        {
            Dbcontext = context;
            _Repository = Repository;
        }

        [HttpGet("GetCurrentTime")]
        public async Task<IActionResult> GetCurrentTime()
        {
            string? currentTime;

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

        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] UserSignupDto signupDto)
        {
            if (signupDto.Password != signupDto.ConfirmPassword)
            {
                return BadRequest("Passwords do not match.");
            }
 
            var existingUser = await _Repository.GetUserByEmailAsync(signupDto.Email);
            if (existingUser != null)
            {
                return Conflict("User already exists.");
            }
 
            var user = new User
            {
                FirstName = signupDto.FirstName,
                LastName = signupDto.LastName,
                Email = signupDto.Email,
                Password = signupDto.Password, // Hashing should be implemented here
                Role = signupDto.Role
            };
 
            await _Repository.AddUserAsync(user);
 
            return Ok("User registered successfully.");
        }
 
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto loginDto)
        {
            var user = await _Repository.GetUserByEmailAsync(loginDto.Email);
            if (user == null || user.Password != loginDto.Password) // Password verification should be done properly
            {
                return Unauthorized(new { message = "Invalid credentials." });
            }
 
            // Implement JWT or session-based authentication here
 
            return Ok(new
            {
                Message = "Login successful",
                Role = user.Role
            });
        }

        
    }
}

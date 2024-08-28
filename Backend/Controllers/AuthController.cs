using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;
using System.Linq;
using System.Threading.Tasks;

namespace UserAuthAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] User user)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Check if the email already exists
            if (await _context.Users.AnyAsync(u => u.Email == user.Email))
                return BadRequest("Email is already in use.");

            // Save the new user
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok("User registered successfully.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel login)
        {
            // Check if a user with the provided email exists
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == login.Email);

            if (existingUser == null)
                return Unauthorized("Invalid email or password.");

            // Check if the provided password matches the stored password
            if (existingUser.Password != login.Password)
                return Unauthorized("Invalid email or password.");

            return Ok(new 
            { 
                Message = "Login successful",
                LoginType = existingUser.LoginType 
            });
        }
    }
}

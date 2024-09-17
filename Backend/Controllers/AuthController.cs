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
                return Conflict(new { Message = "User already exists." });
                
            }

            var user = new User
            {
                FirstName = signupDto.FirstName,
                LastName = signupDto.LastName,
                Email = signupDto.Email,
                Password = signupDto.Password, // Hashing should be implemented here
                Role = signupDto.Role // Include the role in the signup
            };

            await _Repository.InsertUserAsync(user);

            var userId = user.UserId;

            // Initialize user permissions
            await InitializeUserPermissions(userId);

            var response = new { Message = "User registered successfully." };
            return Ok(response);
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
                Role = user.Role, // Return the user's role
                userName=user.FirstName+' '+user.LastName,
                userId=user.UserId
            });
        }

        //This method has to be put in auth helper 
        private async Task InitializeUserPermissions(int userId)
        {
            var tables = new List<string> { "Student", "Employee", "Product" };

            foreach (var table in tables)
            {
                // Check if permissions already exist
                var existingPermission = await _Repository.GetUserPermissionAsync(userId, table);
                if (existingPermission == null)
                {
                    // Create new permission entry with read-only access
                    var userPermission = new UserPermission
                    {
                        UserId = userId,
                        TableName = table,
                        CanRead = true,
                        CanWrite = false,
                        CanUpdate = false,
                        CanDelete = false
                    };

                    await _Repository.AddUserPermissionAsync(userPermission);
                }
            }
        }   
    }
}

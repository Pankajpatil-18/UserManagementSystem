using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserControllers : ControllerBase
    {
        private readonly DataContext Dbcontext;
        private readonly Repository _repository;

        public UserControllers(DataContext context)
        {
            Dbcontext = context;
            _repository = new Repository(Dbcontext);
        }

        [HttpGet("GetUsers")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repository.GetUsersAsync();
            return Ok(users);
        }

        [HttpPut("EditUser")]
        public async Task<IActionResult> EditUser(int userId, string firstName, string lastName, string email)
        {
            var user = await _repository.GetUserByIdAsync(userId);
                
            if (user != null)
            {
                user.FirstName = firstName;
                user.LastName = lastName;
                user.Email = email;
                
                if (await _repository.SaveChangesAsync())
                {
                    return Ok(user);
                } 
                return StatusCode(500, "Failed to update user");
            }
            
            return NotFound("User not found");
        }

        [HttpGet("table-privileges")]
        public async Task<IActionResult> GetTablePrivileges([FromQuery] int userId, [FromQuery] string tableName)
        {
            if (userId <= 0 || string.IsNullOrEmpty(tableName))
            {
                return BadRequest("User ID and Table Name are required.");
            }

            var privilege = await Dbcontext.UserPermissions
                .Where(p => p.UserId == userId && p.TableName == tableName)
                .Select(p => new
                {
                    p.CanRead,
                    p.CanWrite,
                    p.CanUpdate,
                    p.CanDelete
                })
                .FirstOrDefaultAsync();

            if (privilege == null)
            {
                return NotFound("Privileges not found.");
            }

            return Ok(privilege);
        }
    }
}

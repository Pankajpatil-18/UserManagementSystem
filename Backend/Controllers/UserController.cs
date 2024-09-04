using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using Backend.Dtos;



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

        [HttpGet("GetUsersPrivileges")]
        public async Task<IActionResult> GetUsersPrivileges([FromQuery] string tableName)
        {
            if (string.IsNullOrEmpty(tableName))
            {
                return BadRequest("Table Name is required.");
            }
    
            try
            {
                var usersWithPrivileges = new List<object>();
    
                var connection = Dbcontext.Database.GetDbConnection();
                await connection.OpenAsync();
    
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "GetUsersWithPrivileges";
                    command.CommandType = CommandType.StoredProcedure;
    
                    // Use Microsoft.Data.SqlClient.SqlParameter
                    var param = new Microsoft.Data.SqlClient.SqlParameter("@tableName", SqlDbType.NVarChar)
                    {
                        Value = tableName
                    };
                    command.Parameters.Add(param);
    
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var user = new
                            {
                                ID = reader.GetInt32(0),
                                Name = reader.GetString(1),
                                Email = reader.GetString(2),
                                CanInsert = reader.GetInt32(3),   // Assuming these are BIT fields in SQL Server
                                CanUpdate = reader.GetInt32(4),
                                CanDelete = reader.GetInt32(5)
                            };
    
                            usersWithPrivileges.Add(user);
                        }
                    }
                }
    
                await connection.CloseAsync();
    
                return Ok(usersWithPrivileges);
            }
            catch (Exception ex)
            {
                // Log exception details
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }



        [HttpPost("UpdateUserPermissions")]
        public async Task<IActionResult> UpdateUserPermissions([FromBody] UserPermissionUpdateDto updateDto)
        {
            try
            {
                var connection = Dbcontext.Database.GetDbConnection();
                await connection.OpenAsync();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "UpdateUserPermissions";
                    command.CommandType = CommandType.StoredProcedure;

                    // Add parameters
                    command.Parameters.Add(new Microsoft.Data.SqlClient.SqlParameter("@UserId", SqlDbType.Int) { Value = updateDto.UserId });
                    command.Parameters.Add(new Microsoft.Data.SqlClient.SqlParameter("@TableName", SqlDbType.NVarChar) { Value = updateDto.TableName });
                    command.Parameters.Add(new Microsoft.Data.SqlClient.SqlParameter("@CanInsert", SqlDbType.Bit) { Value = updateDto.CanInsert });
                    command.Parameters.Add(new Microsoft.Data.SqlClient.SqlParameter("@CanUpdate", SqlDbType.Bit) { Value = updateDto.CanUpdate });
                    command.Parameters.Add(new Microsoft.Data.SqlClient.SqlParameter("@CanDelete", SqlDbType.Bit) { Value = updateDto.CanDelete });

                    await command.ExecuteNonQueryAsync();
                }

                await connection.CloseAsync();
                return Ok(new { message = "Data updated successfully." });
            }
            catch (Exception ex)
            {
                // Log exception details
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}

    

  
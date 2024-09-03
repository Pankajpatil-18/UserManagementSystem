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

    if (string.IsNullOrEmpty(request.userName))
    {
        return BadRequest("Username is required.");
    }

    // Log request for debugging
    Console.WriteLine($"Received request: UserName={request.userName}, TableName={request.TableName}");

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

        [HttpGet("usersRequest")]
        public async Task<IActionResult> GetRequests(){
            var requests = await _dataContext.Requests
                            .ToListAsync();
            
            return Ok(requests);
        }

        [HttpGet("ReuestByTable/{tableName}")]
        public async Task<IActionResult> GetRequestsByTable(string tableName)
        {
            if (string.IsNullOrEmpty(tableName))
            {
                return BadRequest("Table name is required.");
            }

            var requests = await _dataContext.Requests
                .Where(r => r.TableName == tableName)
                .ToListAsync();

            if (!requests.Any())
            {
                return NotFound("No requests found for the specified table.");
            }

            return Ok(requests);
        }

        [HttpPut("approve/{requestId}")]
        public async Task<IActionResult> ApproveRequest(int requestId)
        {
            var request = await _dataContext.Requests.FindAsync(requestId);

            if (request == null)
            {
                return NotFound("Request not found.");
            }

            request.Status = "Approved";

            // Update permissions based on request type
            var userPermissions = await _dataContext.UserPermissions
                .FirstOrDefaultAsync(up => up.UserId == request.UserId && up.TableName == request.TableName);

            if (userPermissions != null)
            {
                switch (request.RequestType)
                {
                    case "Read":
                        userPermissions.CanRead = true;
                        break;
                    case "Update":
                        userPermissions.CanUpdate = true;
                        break;
                    case "Delete":
                        userPermissions.CanDelete = true;
                        break;
                    case "Write":
                        userPermissions.CanWrite = true;
                        break;
                }
            }

            await _dataContext.SaveChangesAsync();

            return Ok(request);
        }

        [HttpPut("deny/{requestId}")]
        public async Task<IActionResult> DenyRequest(int requestId)
        {
            var request = await _dataContext.Requests.FindAsync(requestId);

            if (request == null)
            {
                return NotFound("Request not found.");
            }

            request.Status = "Denied";
            await _dataContext.SaveChangesAsync();

            return Ok(request);
        }
[HttpDelete("delete/{requestId}")]
public async Task<IActionResult> DeleteRequest(int requestId)
{
    Console.WriteLine($"Received request to delete ID: {requestId}");
    var request = await _dataContext.Requests.FindAsync(requestId);
    
    if (request == null)
    {
        Console.WriteLine($"Request with ID {requestId} not found.");
        return NotFound("Request not found.");
    }
    
    _dataContext.Requests.Remove(request);
    await _dataContext.SaveChangesAsync();
    
    Console.WriteLine($"Request with ID {requestId} deleted successfully.");
    return Ok("Request deleted successfully.");
}


        [HttpGet("requestsWithPermission")]
        public async Task<IActionResult> GetRequestsWithPrivileges([FromQuery] string tableName)
        {
            if (string.IsNullOrEmpty(tableName))
            {
                return BadRequest("Table name is required.");
            }

            var requests = await _dataContext.GetRequestsWithPrivilegesAsync(tableName);

            if (requests == null || !requests.Any())
            {
                return NotFound("No requests found for the specified table.");
            }

            return Ok(requests);
        }
    }
    

}
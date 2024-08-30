using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;

using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Backend.Models;


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
        public IEnumerable<User> GetUsers(){
            
            IEnumerable<User> users = _repository.GetUsers();
            return users;
            

        }
        [HttpPut("EditUser")]
        public IActionResult EditUser(int UserId, string FirstName,string LastName,string Email, bool CanRead, bool CanUpdate, bool CanWrite, bool CanDelete)
        {
            User? userDb = _repository.GetSingleUser(UserId);// to retrieve the first element from collection that matches a specified condition or return a default value if no such element is found
                
            if(userDb != null)
            {
                //UserDb is user from database
                userDb.UserId=UserId;
                userDb.FirstName = FirstName;
                userDb.LastName = LastName;
                userDb.Email = Email;
                userDb.CanRead = CanRead;
                userDb.CanUpdate = CanUpdate;
                userDb.CanWrite = CanWrite;
                userDb.CanDelete = CanDelete;
                
                if(_repository.SaveChanges())
                {
                    return Ok(userDb);
                } 
                throw new Exception("Failed to Update User");
            }    
            throw new Exception("Failed to Get User");
        }

        
    }
}

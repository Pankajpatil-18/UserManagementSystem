

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RequestController : ControllerBase
    {
        IUserRepository userRepo;
        DataContext dataContextEf;
        private readonly IDbConnection  dbConnection ;


        IConfiguration _config;
        public UserCompleteController(IUserRepository iuser,IConfiguration config){
            userRepo=iuser;
            dataContextEf=new DataContext(config);
            _config=config;
           
        }

        


    }
}
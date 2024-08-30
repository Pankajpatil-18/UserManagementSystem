using Microsoft.AspNetCore.Mvc;
using Backend.Data;

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

        // Controller actions
    }
}

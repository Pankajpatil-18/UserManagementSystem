using Backend.Data;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class Repository
    {
        private readonly DataContext _dataContext;

        // Constructor injection
        public Repository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        // Your methods that use _dataContext
    }
}

using Backend.Data;
using Microsoft.EntityFrameworkCore;
using Backend.Models;

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

        public User GetSingleUser(int userId)
        {
            return _dataContext.Users.FirstOrDefault(u => u.UserId == userId);
        }
        public IEnumerable<User> GetUsers()
        {
            IEnumerable<User> users = _dataContext.Users.ToList();
            return users;
        }
        public bool UpdateUser(User user)
        {
            _dataContext.Users.Update(user);
            return SaveChanges();
        }

        public bool InsertUser(User user)
        {
            _dataContext.Users.Add(user);
            return SaveChanges();
        }

        public bool DeleteUser(int userId)
        {
            var user = _dataContext.Users.Find(userId);
            if (user != null)
            {
                _dataContext.Users.Remove(user);
                return SaveChanges();
            }
            return false;
        }

        public bool SaveChanges()
        {
            return _dataContext.SaveChanges() > 0;
        }


    }
}

using Backend.Data;
using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data
{
    public class Repository :IRepository
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
        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _dataContext.Users.SingleOrDefaultAsync(u => u.Email == email);
        }
 
        public async Task<User?> GetUserByIdAsync(int userId)
        {
            return await _dataContext.Users.FindAsync(userId);
        }
 
        public async Task AddUserAsync(User user)
        {
            await _dataContext.Users.AddAsync(user);
            await _dataContext.SaveChangesAsync();
        }
 
        public async Task UpdateUserAsync(User user)
        {
            _dataContext.Users.Update(user);
            await _dataContext.SaveChangesAsync();
        }


    }
}

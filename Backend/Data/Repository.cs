using Backend.Data;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Data
{
    public class Repository : IRepository
    {
        private readonly DataContext _dataContext;

        // Constructor injection
        public Repository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<User?> GetUserByIdAsync(int userId)
        {
            return await _dataContext.Users
                .SingleOrDefaultAsync(u => u.UserId == userId);
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _dataContext.Users.ToListAsync();
        }

        public async Task<bool> UpdateUserAsync(User user)
        {
            _dataContext.Users.Update(user);
            return await SaveChangesAsync();
        }

        public async Task<bool> InsertUserAsync(User user)
        {
            await _dataContext.Users.AddAsync(user);
            return await SaveChangesAsync();
        }

        public async Task<bool> DeleteUserAsync(int userId)
        {
            var user = await _dataContext.Users.FindAsync(userId);
            if (user != null)
            {
                _dataContext.Users.Remove(user);
                return await SaveChangesAsync();
            }
            return false;
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _dataContext.SaveChangesAsync() > 0;
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _dataContext.Users
                .SingleOrDefaultAsync(u => u.Email == email);
        }

        public async Task<UserPermission?> GetUserPermissionAsync(int userId, string tableName)
        {
            return await _dataContext.UserPermissions
                .SingleOrDefaultAsync(up => up.UserId == userId && up.TableName == tableName);
        }

        public async Task AddUserPermissionAsync(UserPermission userPermission)
        {
            await _dataContext.UserPermissions.AddAsync(userPermission);
            await _dataContext.SaveChangesAsync();
        }

    }
}


using Backend.Models;
namespace Backend.Data
{
    public interface IRepository{
        
    //public bool SaveChanges();
    // public void AddEntity<T>(T entityToAdd);
    // public void RemoveEntity<T>(T entityToRemove);
    //public IEnumerable<User> GetUsers();
    //public User GetSingleUser(int UserId);

    Task<User?> GetUserByEmailAsync(string email);
    Task<User?> GetUserByIdAsync(int userId);
    Task<bool> InsertUserAsync(User user);
  
    Task<bool> SaveChangesAsync();
    Task<bool> UpdateUserAsync(User user);
    Task AddUserPermissionAsync(UserPermission userPermission);
     Task<UserPermission?> GetUserPermissionAsync(int userId, string tableName);

    
    
        
    }
    
}
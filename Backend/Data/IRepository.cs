
using Backend.Models;
namespace Backend.Data
{
    public interface IRepository{
        
    public bool SaveChanges();
    // public void AddEntity<T>(T entityToAdd);
    // public void RemoveEntity<T>(T entityToRemove);
    public IEnumerable<User> GetUsers();
    public User GetSingleUser(int UserId);
        
    }
    
}
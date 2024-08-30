using System.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
public class DataContext : DbContext
{
    private readonly IConfiguration _config;

    // Constructor
    public DataContext(DbContextOptions<DataContext> options, IConfiguration config) : base(options)
    {
        _config = config;
    }

    // DbSet properties
    public virtual DbSet<User> Users { get; set; }
    public virtual DbSet<Student> Students { get; set; }
    public virtual DbSet<Employee> Employees { get; set; }
    public DbSet<Product> Products {get; set;}
    public DbSet<Dictionary<string, object>> TableData { get; set; }

    

    // Method to get table names
    public async Task<List<string>> GetTableNamesAsync()
    {
        var tableNames = new List<string>();

        var connection = Database.GetDbConnection();
        try
        {
            await connection.OpenAsync();
            using (var command = connection.CreateCommand())
            {
                command.CommandText = "GetTableNames";
                command.CommandType = CommandType.StoredProcedure;
                using (var reader = await command.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        tableNames.Add(reader.GetString(0));
                    }
                }
            }
        }
        finally
        {
            await connection.CloseAsync();
        }

        return tableNames;
    }


   
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
                .ToTable("User")
                .HasKey(u => u.UserId);
                
        modelBuilder.Entity<Student>()
            .ToTable("Student")
            .HasKey(u => u.StudentId);

        modelBuilder.Entity<Employee>()
            .ToTable("Employee")
            .HasKey(u => u.EmployeeId);

        modelBuilder.Entity<Product>()
            .ToTable("Product")
            .HasKey(u => u.ProductId);
    }
    
}

using System.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient; // For SqlParameter
using Backend.Dtos;

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

    public DbSet<UserPermission> UserPermissions {get; set;}
    public DbSet<Dictionary<string, object>> TableData { get; set; }
    public DbSet<Requests> Requests { get; set; }
     public DbSet<RequestWithPrivileges> RequestWithPrivileges { get; set; } // Add this line


    public DbSet<UserPermissionDto> UserEdits { get; set; } // Add this line

    

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

    // Method to get requests with privileges using stored procedure
      public async Task<List<RequestWithPrivileges>> GetRequestsWithPrivilegesAsync(string tableName)
        {
            var tableNameParam = new SqlParameter("@TableName", tableName);

            var requests = await this.Set<RequestWithPrivileges>()
                .FromSqlRaw("EXEC GetRequestsWithPermissions @TableName", tableNameParam)
                .ToListAsync();

            return requests;
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

        modelBuilder.Entity<UserPermission>()
            .HasKey(up => up.PermissionId);

        modelBuilder.Entity<UserPermission>()
            .HasOne<User>()
            .WithMany(u => u.UserPermissions) // Assuming User does not have a navigation property for UserPermissions
            .HasForeignKey(up => up.UserId);
        
        modelBuilder.Entity<Requests>()
            .ToTable("Requests") // Specify the table name if different from the class name
            .HasKey(r => r.RequestId);

        modelBuilder.Entity<RequestWithPrivileges>(entity =>
        {
            entity.HasNoKey();
            // No table mapping is needed for keyless entities
            // Remove the line `entity.ToTable(null);`
        });

        modelBuilder.Entity<UserPermissionDto>(entity =>
        {
            entity.HasNoKey();
        });
 
        

        

    }
    
}

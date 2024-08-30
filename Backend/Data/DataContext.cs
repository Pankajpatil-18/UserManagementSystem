using Microsoft.EntityFrameworkCore;
using Backend.Models;
public class DataContext : DbContext
{
    private readonly IConfiguration _config;

    public DataContext(DbContextOptions<DataContext> options, IConfiguration config) : base(options)
    {
        _config = config;
    }

    public virtual DbSet<User> Users { get; set; }
    public virtual DbSet<Student> Students { get; set; }
    public virtual DbSet<Employee> Employees { get; set; }
    public DbSet<Product> Products {get; set;}

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

 // Adjust the namespace to match your actual model location
using Microsoft.EntityFrameworkCore;

namespace Backend.Data  // Adjust the namespace to match your actual data context location
{
    public class DataContext : DbContext
    {
        private IConfiguration config;

        // Constructor
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DataContext(IConfiguration config)
        {
            this.config = config;
        }

        // DbSet properties for each entity you have
        // public DbSet<Student> Students { get; set; }
        // public DbSet<Employee> Employees { get; set; }
        // public DbSet<Product> Products { get; set; }
        // public DbSet<User> Users { get; set; }
        // public DbSet<Request> Requests { get; set; }

        // Override OnModelCreating if you need to configure specific behaviors for your entities
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure keys, relationships, etc.
            // modelBuilder.Entity<Student>().ToTable("Student").HasKey(s => s.Roll_no);
            // modelBuilder.Entity<Employee>().ToTable("Employee").HasKey(e => e.EmployeeId);
            // modelBuilder.Entity<Product>().ToTable("Product").HasKey(p => p.ProductId);
            // modelBuilder.Entity<User>().ToTable("User").HasKey(u => u.UserId);
            // modelBuilder.Entity<Request>().ToTable("Request").HasKey(r => r.RequestId);

            // Additional configurations if needed
        }
    }
}

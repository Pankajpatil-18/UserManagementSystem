using Microsoft.EntityFrameworkCore;
public class DataContext : DbContext
{
    private readonly IConfiguration _config;

    public DataContext(DbContextOptions<DataContext> options, IConfiguration config) : base(options)
    {
        _config = config;
    }

    // DbSet properties and other configurations

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configuration for entities
    }
}

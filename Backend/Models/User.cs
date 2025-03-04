namespace Backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; } // Consider hashing passwords in real applications
        public string? LoginType { get; set; } // 'user' or 'admin'
    }
}

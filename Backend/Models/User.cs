namespace Backend.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; } // Consider hashing passwords in real applications
        public string? Role { get; set; } // 'user' or 'admin'
         public Boolean CanRead{get; set; }
        public Boolean CanUpdate{get; set; }
        public Boolean Canwrite{get; set; }
        public Boolean CanDelete{get; set; }
    }
}

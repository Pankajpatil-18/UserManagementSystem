namespace Backend.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; } 
        public string? Role { get; set; } // 'user' or 'admin'
         public Boolean CanRead{get; set; }
        public Boolean CanUpdate{get; set; }
        public Boolean CanWrite{get; set; }
        public Boolean CanDelete{get; set; }
    }
}

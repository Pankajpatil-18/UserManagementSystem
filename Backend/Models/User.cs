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
// CREATE TABLE [User](
//     UserId INT IDENTITY(1,1) PRIMARY KEY,      
//     FirstName NVARCHAR(50) NOT NULL,          
//     LastName NVARCHAR(50) NOT NULL,                          
//     Email NVARCHAR(100) NOT NULL UNIQUE,       
//     Password NVARCHAR(100) NOT NULL,           
//     Role NVARCHAR(10) NOT NULL CHECK (Role IN ('User', 'Admin')),  
//     CanRead BIT NOT NULL,                      
//     CanWrite BIT NOT NULL,                     
//     CanUpdate BIT NOT NULL,                    
//     CanDelete BIT NOT NULL                 
// );
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50)]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        [StringLength(100)]
        public string Password { get; set; }

        [Required]
        [StringLength(20)]
        public string Role { get; set; } // This property stores the role of the user, e.g., "Admin" or "User"

        // Navigation properties
        public ICollection<UserPermission> UserPermissions { get; set; }
        public ICollection<Requests> Requests { get; set; }
        
         
    }
}

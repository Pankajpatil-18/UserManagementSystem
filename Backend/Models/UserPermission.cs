using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class UserPermission
    {
         public int PermissionId { get; set; } // Primary key for the permission entry
        [ForeignKey("User")]
        public int UserId { get; set; }// Foreign key to link to the User
        public string TableName { get; set; } // The name of the table to which permissions apply
        public bool CanRead { get; set; } // Indicates if the user has read access
        public bool CanWrite { get; set; } // Indicates if the user has write access
        public bool CanUpdate { get; set; } // Indicates if the user has update access
        public bool CanDelete { get; set; } // Indicates if the user has delete access
    }
}

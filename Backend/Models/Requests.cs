using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Requests
    {
        [Key]
        public int RequestId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        [StringLength(100)]
        public string TableName { get; set; }

        [Required]
        [StringLength(50)]
        public string RequestType { get; set; } // Examples: 'Add', 'Edit', 'Delete', 'Read'

        [StringLength(int.MaxValue)]
        public string Message { get; set; }

        [Required]
        [StringLength(20)]
        public string Status { get; set; } = "Pending"; // Examples: 'Pending', 'Approved', 'Denied'

        [Required]
        public DateTime Date { get; set; } = DateTime.Now;

        // Navigation properties
        [ForeignKey("UserId")]
        public User User { get; set; }
       
    }
}


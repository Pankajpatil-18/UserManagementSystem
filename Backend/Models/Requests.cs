using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Requests
    {
        [Key]
        public int RequestId { get; set; }

   
        public int UserId { get; set; }

     
        [StringLength(100)]
        public string TableName { get; set; }

        [Required]
        [StringLength(50)]
        public string? userName {get;set;}

    
        [StringLength(50)]
        public string RequestType { get; set; } // Examples: 'Add', 'Edit', 'Delete', 'Read'

        [StringLength(int.MaxValue)]
        public string Message { get; set; }

    
        [StringLength(20)]
        public string Status { get; set; } = "Pending"; // Examples: 'Pending', 'Approved', 'Denied'

    
        public DateTime Date { get; set; } = DateTime.Now;

       
       
    }
}


using System.ComponentModel.DataAnnotations;
 
public class UserPrivilegesDto
{
 
    [Required]
    public int ID { get; set; }
    [Required]
    public string? Name { get; set; }
    [Required]
    public string? Email { get; set; }
    [Required]
    public bool CanInsert { get; set; }
    [Required]
    public bool CanUpdate { get; set; }
    [Required]
    public bool CanDelete { get; set; }
}
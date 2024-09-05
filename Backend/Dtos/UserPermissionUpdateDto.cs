using System.ComponentModel.DataAnnotations;

public class UserPermissionUpdateDto
{
    [Required]
    public int UserId { get; set; }

    [Required]
    public string TableName { get; set; }

    [Required]
    public bool CanInsert { get; set; }

    [Required]
    public bool CanUpdate { get; set; }

    [Required]
    public bool CanDelete { get; set; }
}

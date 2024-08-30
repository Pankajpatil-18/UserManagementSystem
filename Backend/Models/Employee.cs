namespace Backend.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public DateTime DOJ { get; set; }
        public float Salary{get; set;}
        
    }
}

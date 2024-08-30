namespace Backend.Models
{
    public class Student
    {
        public int StudentId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Class { get; set; }
        public string? Department { get; set; }
        public DateTime DOB { get; set; }
        public float CGPA{get; set;}
       
    }
}

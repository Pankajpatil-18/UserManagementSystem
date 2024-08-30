namespace Backend.Models
{
    public class Requests
    {
        public int RequestId { get; set; }
        public int UserId { get; set; }
        public string? UserName { get; set; }
        public string? TableName { get; set; }
        public string? RequestType { get; set; }
        public string? Message { get; set; }
        public string? Status { get; set; }
        public DateTime Date { get; set; }
       
    }
}


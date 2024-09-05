// Models/RequestWithPrivileges.cs
namespace Backend.Models
{
    public class RequestWithPrivileges
    {
        public int RequestId { get; set; }
        public string UserName { get; set; }
        public string TableName { get; set; }
        public string RequestType { get; set; }
        public string Status { get; set; }
        public DateTime Date { get; set; }
        public string Message { get; set; }
        public bool CanRead { get; set; }
        public bool CanWrite { get; set; }
        public bool CanUpdate { get; set; }
        public bool CanDelete { get; set; }
    }
}

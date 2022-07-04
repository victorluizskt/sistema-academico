namespace SMA.Backend.Models
{
    public class StudentReturnModel
    {
        public string TypeUser { get; set; }
        public string UserName { get; set; }
        public string NameUser { get; set; }
        public string PasswordUser { get; set; }
        public string Course { get; set; }
        public int Registration { get; set; }
        public bool Success { get; set; }
    }
}

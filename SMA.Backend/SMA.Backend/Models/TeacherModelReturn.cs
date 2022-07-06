namespace SMA.Backend.Models
{
    public class TeacherModelReturn
    {
        public string NomeProfessor { get; set; }
        public int IdProfessor { set; get; }
        public string Usuario { get; set; }
        public string Senha { get; set; }
	    public int IdDisciplina { get; set; } 
        public bool Success { get; set; }
	    public string NomeDisciplina { set; get; }
    }
}

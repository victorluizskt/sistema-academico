namespace SMA.Backend.Models
{
    public class RetornarDisciplinas
    {
        public string NomeDisciplina { get; set; }
        public int CargaHoraria { get; set; }
        public int Sala { get; set; }
        public string Professor { get; set; }
        public string Horario { get; set; }
        public int QuantidadeMaximaAluno { get; set; }
        public int IdProfessor { get; set; }
        public int IdDisciplina { get; set; }
    }
}

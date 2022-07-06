namespace SMA.Backend.Models
{
    public class StudentDisciplinesReturn : StudentDisciplines
    {
        public int MediaTurma { get; set; }
        public string Aprovado { get; set; }

        public StudentDisciplinesReturn(
            StudentDisciplines studentDisciplines,
            string aprovado
        )
        {
            NomeDisciplina = studentDisciplines.NomeDisciplina;
            Nota = studentDisciplines.Nota;
            Frequencia = studentDisciplines.Frequencia;
            NomeProfessor = studentDisciplines.NomeProfessor;
            MediaTurma = 80;
            Aprovado = aprovado;
        }
    }
}

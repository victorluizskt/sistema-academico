using Dapper;
using Microsoft.AspNetCore.Mvc;
using SMA.Backend.Models;

namespace SMA.Backend.Controllers
{
    [Route("teacher")]
    public class TeacherController : ControllerBase
    {
        private DbSession _session;

        public TeacherController(DbSession dbSession)
        {
            _session = dbSession;
        }

        [HttpPost("getAllStudents")]
        public async Task<IEnumerable<RetornarProfessorDisciplinas>> GetAllStudents(
            [FromBody] IdProfessor idProfessor
        )
        {
            using var conn = _session.Connection;
            var dynamicParameters = new DynamicParameters();
            dynamicParameters.Add("@idProfessor", idProfessor.ProfessorId);
            var list = await conn.QueryAsync<RetornarProfessorDisciplinas>(GET_ALL_STUDENT, dynamicParameters);
            
            foreach (var item in list)
            {
                if(item.FrequenciaAluno == "0")
                {
                    item.FrequenciaAluno = "Pendente de lançamento";
                }

                if(item.NotaAluno == "0")
                {
                    item.NotaAluno = "Pendente de lançamento";
                }
            }

            return list;
        }

        [HttpPost("editStudent")]
        public async Task<IActionResult> EditStudent(
            [FromBody] InfoStudent infoStudent
        )
        {
            using var conn = _session.Connection;
            var dynamicParameters = new DynamicParameters();
            dynamicParameters.Add("@novaNota", infoStudent.NotaAluno);
            dynamicParameters.Add("@novaFrequencia", infoStudent.FrequenciaAluno);
            dynamicParameters.Add("@matricula", infoStudent.StudentId);
            dynamicParameters.Add("@idDisciplina", infoStudent.IdDisciplina);

            await conn.ExecuteAsync(EDIT_STUDENT, dynamicParameters);
            return Ok();
        }

        private readonly string GET_ALL_STUDENT = @"
            SELECT 
	            alu.nome as NomeAluno,
	            cur.nome as NomeCurso,
	            disc.nome_disciplina as NomeDisciplina,
	            disc.id_disciplina as IdDisciplina,
	            disc.horario as Horario,
	            met.frequencia as FrequenciaAluno,
	            met.nota as NotaAluno
            FROM dbo.professor prof
            INNER JOIN dbo.metricas_aluno met ON met.id_professor = prof.id_professor
            INNER JOIN dbo.aluno alu ON alu.matricula = met.matricula
            INNER JOIN dbo.curso cur ON cur.id_curso = alu.id_curso
            INNER JOIN dbo.disciplina disc ON disc.id_disciplina = met.id_disciplina
            WHERE prof.id_professor = @idProfessor
        ";

        private readonly string EDIT_STUDENT = @"
            UPDATE dbo.metricas_aluno
            SET nota = @novaNota, frequencia = @novaFrequencia
            WHERE matricula = @matricula
                AND id_disciplina = @idDisciplina
        ";
    }
}

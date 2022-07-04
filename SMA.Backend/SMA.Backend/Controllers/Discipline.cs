using Dapper;
using Microsoft.AspNetCore.Mvc;
using SMA.Backend.Models;

namespace SMA.Backend.Controllers
{
    [Route("discipline")]
    public class Discipline : ControllerBase
    {
        private DbSession _session;

        public Discipline(DbSession dbSession)
        {
            _session = dbSession;
        }

        [HttpPost("getAllDiscipline")]
        public async Task<IEnumerable<object>> GetAllDisciplineStudent(
           [FromBody] CourseModel request
        )
        {
            using var conn = _session.Connection;
            var dynamicParameters = new DynamicParameters();
            dynamicParameters.Add("@CourseId", request.CourseId);
            var list = await conn.QueryAsync(GET_ALL_DISCIPLINE, dynamicParameters);
            return list;
        }

        #region SQL
        private readonly string GET_ALL_DISCIPLINE = @"
            SELECT
	            disc.nome_disciplina as NomeDisciplina,
	            disc.id_disciplina as IdDisciplina,
	            disc.carga_horaria as CargaHoraria,
	            prf.nome_professor as NomeProfessor,
	            sal.numero_sala as Sala,
	            disc.qnt_max_aluno as QuantidadeMaximaAluno
            FROM dbo.disciplina disc
            INNER JOIN dbo.professor prf on prf.id_professor = disc.id_professor
            INNER JOIN dbo.curso cur on cur.id_curso = disc.id_curso
            INNER JOIN dbo.sala sal on sal.numero_sala = disc.id_sala
            WHERE cur.id_curso = @CourseId;
        ";
        #endregion
    }
}

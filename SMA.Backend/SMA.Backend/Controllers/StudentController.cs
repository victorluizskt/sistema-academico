using Dapper;
using Microsoft.AspNetCore.Mvc;
using SMA.Backend.Models;

namespace SMA.Backend.Controllers
{
    [Route("student")]
    public class StudentController : ControllerBase
    {
        private DbSession _session;

        public StudentController(DbSession dbSession)
        {
            _session = dbSession;
        }

        [HttpDelete("deleteStudent")]
        public async Task<IActionResult> DeleteStudent(
            [FromBody] StudentId studentId
        )
        {
            using var conn = _session.Connection;
            if (studentId.StudentRegistration > 0)
            {
                var query = string.Format(DELETE_STUDENT, studentId.StudentRegistration, studentId.StudentRegistration);
                await conn.ExecuteAsync(query);
                return Ok("Usuário deletado com sucesso.");
            }

            return BadRequest("Usuário não existe em nossa base de dados");
        }

        [HttpPost("getAllDiscipline")]
        public async Task<IActionResult> GetAllDiscipline(
            [FromBody] Matricula matricula
        )
        {
            using var conn = _session.Connection;
            if (matricula.MatriculaAluno > 0)
            {
                var dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("@matricula", matricula.MatriculaAluno);
                var lista1 = await conn.QueryAsync<RetornarDisciplinas>(GET_ALL_DISCIPLINE);
                var lista2 = await conn.QueryAsync<RetornarDisciplinas>(GET_ALL_DISCIPLINE_TO_STUDENT, dynamicParameters);
                var lista4 = lista2.Select(x => x.IdDisciplina);

                if (lista2.Any())
                {
                    var lista3 = lista1.Where(i => !lista4.Contains(i.IdDisciplina));
                    return Ok(lista3);
                }

                return Ok(lista1);
            }

            return BadRequest();
        }

        [HttpPost("addStudentDiscipline")]
        public async Task<IActionResult> AddStudentMethod(
            [FromBody] Matricula matricula
        )
        {
            using var conn = _session.Connection;
            var dynamicParameters = new DynamicParameters();
            dynamicParameters.Add("@matricula", matricula.MatriculaAluno);
            dynamicParameters.Add("@idTurma", matricula.TurmaAluno);
            dynamicParameters.Add("@idProfessor", matricula.IdProfessor);
            dynamicParameters.Add("@idDisciplina", matricula.IdDisciplina);

            await conn.ExecuteAsync(ADD_STUDENT_IN_DISCIPLINE, dynamicParameters);
            return Ok();
        }

        [HttpPost("registerStudentDiscipline")]
        public async Task<IActionResult> RegisterStudentDiscipline(
            [FromBody] DisciplineRegisterModel request
        )
        {
            using var conn = _session.Connection;
            var dynamicParameters = new DynamicParameters();
            dynamicParameters.Add("@matricula", request.StudentId);
            dynamicParameters.Add("@id_turma", request.TurmaId);
            dynamicParameters.Add("@id_professor", request.TeacherId);
            dynamicParameters.Add("@id_disciplina", request.DisciplineId);
            await conn.ExecuteAsync(REGISTER_STUDENT_DISCIPLINE, dynamicParameters);
            return Ok("Disciplina cadastrada com sucesso.");
        }

        [HttpPost("getAllDisciplineStudent")]
        public async Task<IEnumerable<StudentDisciplinesReturn>> GetAllDisciplineStudent(
            [FromBody] Matricula matricula
        )
        {
            
            using var conn = _session.Connection;
            var dynamicParameters = new DynamicParameters();
            dynamicParameters.Add("@StudentId", matricula.MatriculaAluno);
            var list = await conn.QueryAsync<StudentDisciplines>(GET_ALL_DISCIPLINE_STUDENT, dynamicParameters);
            var listaComAprovado = new List<StudentDisciplinesReturn> { };
            foreach(var item in list)
            {
                var nota = int.TryParse(item.Nota, out int number);
                if (nota)
                {
                    if(Int32.Parse(item.Nota) >= 60) {
                        listaComAprovado.Add(new StudentDisciplinesReturn(item, $"Aprovado"));
                    } else if (Int32.Parse(item.Nota) == 0)
                    {
                        item.Nota = "N/A";
                        item.Frequencia = "N/A";
                        listaComAprovado.Add(new StudentDisciplinesReturn(item, $"Notas não lançadas"));
                    } 
                    else
                    {
                        listaComAprovado.Add(new StudentDisciplinesReturn(item, $"Reprovado"));
                    }
                } 
            }

            return listaComAprovado;
        }

        [HttpPost("registerStudent")]
        public async Task<bool> RegisterStudent(
            [FromBody] StudentRegister request
        )
        {
            using var conn = _session.Connection;
            var dynamicParameters = new DynamicParameters();
            dynamicParameters.Add("@userName", request.UserName);
            dynamicParameters.Add("@name", request.UserName);
            dynamicParameters.Add("@password", request.Password);
            dynamicParameters.Add("@idCourse", request.IdCourse);
            dynamicParameters.Add("@registration", request.Registration);
            await conn.ExecuteAsync(REGISTER_STUDENT, dynamicParameters);

            return true;
        }

        #region Queries
        private readonly string REGISTER_STUDENT_DISCIPLINE = @"
            INSERT INTO dbo.metricas_alunos
            VALUES (@matricula, 0, 0, @id_turma, @id_professor, @id_disciplina);
        ";

        private readonly string ADD_STUDENT_IN_DISCIPLINE = @"
            INSERT INTO dbo.metricas_aluno (matricula, id_turma, id_professor, id_disciplina, frequencia, nota)
            VALUES (@matricula, @idTurma, @idProfessor, @idDisciplina, 0, 0)
        ";

        private readonly string PEGAR_MEDIA_TURMA = @"
            SELECT nota FROM dbo.metricas_aluno;
        ";

        private readonly string REGISTER_STUDENT = @"
            INSERT INTO dbo.aluno (matricula, nome, id_curso, usuario, senha)
            VALUES (@registration, @name, @idCourse, @userName, @password)
        ";

        private readonly string GET_ALL_DISCIPLINE_STUDENT = @"
            SELECT 
	            dis.nome_disciplina as NomeDisciplina,
	            mal.nota as Nota,
	            mal.frequencia as Frequencia,
	            pro.nome_professor as NomeProfessor
            FROM dbo.metricas_aluno mal
            INNER JOIN dbo.professor pro ON pro.id_professor = mal.id_professor
            INNER JOIN dbo.disciplina dis ON dis.id_disciplina = mal.id_disciplina
            INNER JOIN dbo.aluno alu ON alu.matricula = mal.matricula
            WHERE mal.matricula = @StudentId
        ";

        private readonly string DELETE_STUDENT = @"
            DELETE dbo.metricas_aluno 
            WHERE matricula = '{0}'

            DELETE dbo.aluno
            WHERE matricula = '{1}'
        ";

        private readonly string GET_ALL_DISCIPLINE = @"
            SELECT 
	        disc.nome_disciplina as NomeDisciplina,
	        disc.carga_horaria as CargaHoraria,
	        disc.id_sala as Sala,
	        disc.horario as horario,
	        disc.qnt_max_aluno as quantidadeMaximaAluno,
	        prof.nome_professor as Professor,
	        prof.id_disciplina as IdProfessor,
	        disc.id_disciplina as IdDisciplina
        FROM dbo.disciplina disc
        INNER JOIN dbo.professor prof on prof.id_professor = disc.id_professor
        ";

        private readonly string GET_ALL_DISCIPLINE_TO_STUDENT = @"
            SELECT 
	            disc.nome_disciplina as NomeDisciplina,
	            disc.carga_horaria as CargaHoraria,
	            disc.id_sala as Sala,
	            disc.horario as horario,
	            disc.qnt_max_aluno as quantidadeMaximaAluno,
	            prof.nome_professor as Professor,
	            prof.id_disciplina as IdProfessor,
	            disc.id_disciplina as IdDisciplina
            FROM dbo.disciplina disc
            INNER JOIN dbo.professor prof on prof.id_professor = disc.id_professor
            INNER JOIN dbo.metricas_aluno met on met.id_disciplina = disc.id_disciplina
            WHERE met.matricula = @matricula
        ";

        private static bool PegarDisciplinasDiferentes(
            IEnumerable<RetornarDisciplinas> retornars, 
            RetornarDisciplinas retornarDisciplinas
        )
        {
            foreach(var item1 in retornars)
            {
                if(item1.IdDisciplina == retornarDisciplinas.IdDisciplina)
                {
                    return true;
                }
            }

            return false;
        }
        #endregion  
    }
}

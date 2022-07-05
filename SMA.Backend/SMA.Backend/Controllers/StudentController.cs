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

        [HttpPost("insertStudent")]
        public async Task<IActionResult> UpdateStudent(
        [FromBody] StudentModel request
        )
        {
            using var conn = _session.Connection;
            if (request.Registration > 0 && request.TypeUser.Equals("Aluno"))
            {
                var dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("@registration", request.Registration);
                dynamicParameters.Add("@name", request.NameUser);
                dynamicParameters.Add("@idCourse", request.Course);
                dynamicParameters.Add("@user", request.UserName);
                dynamicParameters.Add("@password", request.PasswordUser);

                await conn.ExecuteAsync(INSERT_STUDENT, dynamicParameters);
                return Ok("Usuário criado com sucesso.");
            }

            return BadRequest("Informações inválidas.");
        }


        [HttpPut("updateStudent")]
        public async Task<IActionResult> UpdateStudent(
        [FromBody] StudentInfos request
        )
        {
            using var conn = _session.Connection;
            if(request.Matricula is not null)
            {
                var query = string.Format(UPDATE_STUDENT, request.User, request.Password, request.Matricula);
                await conn.ExecuteAsync(query);
                return Ok("Usuário alterado com sucesso.");
            }

            return BadRequest("Usuário não existe em nossa base de dados");
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
        public async Task<IEnumerable<object>> GetAllDisciplineStudent(
            [FromBody] int StudentId    
        )
        {
            using var conn = _session.Connection;
            var dynamicParameters = new DynamicParameters();
            dynamicParameters.Add("@StudentId", StudentId);
            var list = await conn.QueryAsync(GET_ALL_DISCIPLINE_STUDENT, dynamicParameters);
            return list;
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

        private readonly string REGISTER_STUDENT = @"
            INSERT INTO dbo.aluno (matricula, nome, id_curso, usuario, senha)
            VALUES (@registration, @name, @idCourse, @userName, @password)
        ";

        private readonly string GET_ALL_DISCIPLINE_STUDENT = @"
            SELECT 
	            mal.matricula as Matricula,
	            mal.frequencia as Frequencia,
	            mal.nota as Nota,
	            pro.nome_professor as Professor,
	            dis.nome_disciplina as NomeDisciplina,
	            alu.nome as NomeAluno
            FROM dbo.metricas_aluno mal
            INNER JOIN dbo.professor pro ON pro.id_professor = mal.id_professor
            INNER JOIN dbo.disciplina dis ON dis.id_disciplina = mal.id_disciplina
            INNER JOIN dbo.aluno alu ON alu.matricula = mal.matricula
            WHERE mal.matricula = @StudentId
        ";
        private readonly string UPDATE_STUDENT = @"
            UPDATE dbo.aluno
            SET usuario = '{0}', senha = '{1}'
            WHERE matricula = '{2}'
        ";

        private readonly string DELETE_STUDENT = @"
            DELETE dbo.metricas_aluno 
            WHERE matricula = '{0}'

            DELETE dbo.aluno
            WHERE matricula = '{1}'
        ";

        private readonly string INSERT_STUDENT = @"
            INSERT INTO dbo.aluno (matricula, nome, id_curso, usuario, senha)
            VALUES (@registration, @name, @idCourse, @user, @password);
        ";
        #endregion  
    }
}

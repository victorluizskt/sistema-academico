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
                dynamicParameters.Add("@name", request.Name);
                dynamicParameters.Add("@idCourse", request.Course);
                dynamicParameters.Add("@user", request.User);
                dynamicParameters.Add("@password", request.Password);

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

        #region Queries
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

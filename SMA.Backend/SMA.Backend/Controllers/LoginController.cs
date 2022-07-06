using Dapper;
using Microsoft.AspNetCore.Mvc;
using SMA.Backend.Models;
using System.Data;

namespace SMA.Backend.Controllers
{
    [Route("login")]
    public class LoginController : ControllerBase
    {
        private DbSession _session;

        public LoginController(DbSession dbSession)
        {
            _session = dbSession;
        }

        [HttpPost()]
        public async Task<IActionResult> LoginUser(
            [FromBody]  LoginModel loginModel
        )
        {
            using var conn = _session.Connection;

            if (loginModel.TeacherOrStudent.Equals("aluno"))
            {
                var user = await GetUserByRegistration(loginModel);
                if(user.Registration > 0)
                    return Ok(user);
            } else if(loginModel.TeacherOrStudent.Equals("professor"))
            {
                var user = await GetUserByRegistrationTeacher(loginModel);
                if (user.IdProfessor > 0)
                    return Ok(user);
            }

            return BadRequest("Não achamos o usuário");
        }

        private async Task<TeacherModelReturn> GetUserByRegistrationTeacher(LoginModel loginModel)
        {
            using var conn = _session.Connection;
            var dynamic = new DynamicParameters();
            dynamic.Add("@userName", loginModel.UserName, DbType.String);
            dynamic.Add("@senha", loginModel.Password, DbType.String);
            return await conn.QueryFirstOrDefaultAsync<TeacherModelReturn>(GET_INFO_TEACHER, dynamic);
        }

        private async Task<StudentReturnModel> GetUserByRegistration(LoginModel logged)
        {
            using var conn = _session.Connection;
            var dynamic = new DynamicParameters();
            dynamic.Add("@userName", logged.UserName, DbType.String);
            dynamic.Add("@senha", logged.Password, DbType.Int32);
            return await conn.QueryFirstOrDefaultAsync<StudentReturnModel>(GET_INFO_STUDENT, dynamic);
        }

        #region Queries
        private readonly string GET_INFO_STUDENT = @"
            SELECT 
	            alu.matricula as Registration,
	            alu.nome as NameUser,
	            alu.usuario as UserName,
	            'aluno' as TypeUser,
	            alu.senha as PasswordUser,
                1 as Success,
	            cur.nome as Course
            FROM dbo.aluno alu
            INNER JOIN dbo.curso cur on cur.id_curso = alu.id_curso
            WHERE 
                alu.usuario = @userName
                AND alu.senha = @senha;
        ";

        private readonly string GET_INFO_TEACHER = @"
            SELECT 
                prf.nome_professor as NomeProfessor,
                prf.id_professor as IdProfessor,
                prf.usuario as Usuario,
                prf.senha as Senha,
	            disc.id_disciplina AS IdDisciplina, 
                1 as Success,
	            disc.nome_disciplina as NomeDisciplina
            FROM dbo.professor prf
            INNER JOIN dbo.disciplina disc on disc.id_disciplina = prf.id_disciplina
            WHERE prf.usuario = @userName
                  AND prf.senha = @senha
        ";
        #endregion
    }
}

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
                var logged = await ValidateUser(loginModel.UserName, loginModel.Password, GET_TEACHER);
                return Ok(logged);
            }

            return BadRequest("Não achamos o usuário");
        }

        private async Task<StudentReturnModel> GetUserByRegistration(LoginModel logged)
        {
            using var conn = _session.Connection;
            var dynamic = new DynamicParameters();
            dynamic.Add("@userName", logged.UserName, DbType.String);
            dynamic.Add("@senha", logged.Password, DbType.Int32);
            return await conn.QueryFirstOrDefaultAsync<StudentReturnModel>(GET_INFO_STUDENT, dynamic);
        }

        private async Task<string> ValidateUser(string username, string password, string queryProccess)
        {
            using var conn = _session.Connection;
            var query = string.Format(queryProccess, username, password);
            return await conn.QueryFirstOrDefaultAsync<string>(query);
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
       
        private readonly string GET_TEACHER = @"
            SELECT * FROM dbo.professor WHERE usuario = '{0}' AND senha = '{1}'
        ";
        #endregion
    }
}

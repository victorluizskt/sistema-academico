using Dapper;
using Microsoft.AspNetCore.Mvc;
using SMA.Backend.Models;

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

            if (loginModel.TeacherOrStudent.Equals("Aluno"))
            {
                var logged = await ValidateUser(loginModel.UserName, loginModel.Password, GET_STUDENT);
                return Ok(logged);
            } else if(loginModel.TeacherOrStudent.Equals("Professor"))
            {
                var logged = await ValidateUser(loginModel.UserName, loginModel.Password, GET_TEACHER);
                return Ok(logged);
            }

            return BadRequest("Não achamos o usuário");
        }


        private async Task<dynamic> ValidateUser(string username, string password, string queryProccess)
        {
            using var conn = _session.Connection;
            var query = string.Format(queryProccess, username, password);
            return await conn.QueryFirstOrDefaultAsync(query);
        }


        #region Queries
        private readonly string GET_STUDENT = @"
            SELECT * FROM dbo.aluno WHERE usuario = '{0}' AND senha = '{1}'
        ";

        private readonly string GET_TEACHER = @"
            SELECT * FROM dbo.professor WHERE usuario = '{0}' AND senha = '{1}'
        ";
        #endregion
    }
}

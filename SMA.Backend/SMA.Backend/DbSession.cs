using System.Data;
using System.Data.SqlClient;

namespace SMA.Backend
{
    public class DbSession : IDisposable
    {

        public IDbConnection Connection { get; set; }

        public DbSession(IConfiguration configuration)
        {
            Connection = new SqlConnection(configuration.GetConnectionString("DefaultConnection"));
            Connection.Open();
        }

        public void Dispose()
        {
            Connection?.Close();
            Connection?.Dispose();
        }
    }
}

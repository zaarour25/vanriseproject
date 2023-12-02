using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Web.Http;
using vanriseProject.Models;

namespace vanriseProject.Controllers
{
    [RoutePrefix("api/users")]
    public class UserController : ApiController
    {
        private  string connectionString = "Data Source=(local);Initial Catalog=databaseVan;Integrated Security=True;";

        [HttpGet]
        [Route("getusers")]
        public IHttpActionResult GetAllUsers()
        {
            List<User> users = new List<User>();

            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand("GetAllUsers", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            users.Add(new User
                            {
                                Id = Convert.ToInt32(reader["Id"]),
                                Username = Convert.ToString(reader["Username"]),
                                Password = Convert.ToString(reader["Password"])
                            });
                        }
                    }
                }
            }

            return Ok(users);
        }
    }
}

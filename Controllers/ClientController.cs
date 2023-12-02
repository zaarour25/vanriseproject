using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using vanriseProject.Models;

namespace vanriseProject.Controllers
{
    [RoutePrefix("api/clients")]
    public class ClientController : ApiController
    {

        private string connectionString = "Data Source=(local);Initial Catalog=devices;Integrated Security=True;";
        [HttpPost]
        [Route("AddClient")]
        public void AddClient(Client client)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                string sqlQuery = "INSERT INTO Clients (ID, Name, Type, Birthdate) VALUES (@ID, @Name, @Type, @Birthdate);";
                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    command.Parameters.AddWithValue("@ID", client.ID);
                    command.Parameters.AddWithValue("@Name", client.Name);
                    command.Parameters.AddWithValue("@Type", client.Type);

                    // Set Birthdate to DBNull.Value for Organization type
                    command.Parameters.AddWithValue("@Birthdate", client.Type == ClientType.Organization ? DBNull.Value : (object)client.Birthdate);

                    command.ExecuteNonQuery();
                }
            }
        }


        [HttpGet]
        [Route("GetClient")]
        public DataTable GetAllClients()
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                string sqlQuery = "SELECT ID, Name,Type,Birthdate FROM Clients;";
                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                    {
                        DataTable dataTable = new DataTable();
                        adapter.Fill(dataTable);
                        return dataTable;
                    }
                }
            }
        }


        [HttpPut]
        [Route("UpdateClient")]
        public void UpdateClient(Client client)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                string sqlQuery = "UPDATE Clients SET Name = @Name WHERE ID = @ID;";
                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    command.Parameters.AddWithValue("@ID", client.ID);
                    command.Parameters.AddWithValue("@Name", client.Name);
                    command.ExecuteNonQuery();
                }
            }
        }




    }
}

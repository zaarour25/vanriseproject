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
    [RoutePrefix("api/phone")]
    public class PhoneNumberController : ApiController
    {


        private string connectionString = "Data Source=(local);Initial Catalog=devices;Integrated Security=True;";
        [HttpPost]
        [Route("AddPhone")]
        public void AddPhone(PhoneNumber phone)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                string sqlQuery = "INSERT INTO Phones (ID, Number, Device) VALUES (@ID, @Number, @Device);";
                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    command.Parameters.AddWithValue("@ID", phone.ID);
                    command.Parameters.AddWithValue("@Number", phone.Number);
                    command.Parameters.AddWithValue("@Device", phone.Device);
                    command.ExecuteNonQuery();
                }
            }
        }


        [HttpGet]
        [Route("GetPhone")]
        public DataTable GetAllPhones()
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                string sqlQuery = "SELECT ID, Number,Device FROM Phones;";
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
        [Route("UpdatePhone")]
        public void UpdatePhone(PhoneNumber phone)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                string sqlQuery = "UPDATE Phones SET Number = @Number WHERE ID = @ID;";
                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    command.Parameters.AddWithValue("@ID", phone.ID);
                    command.Parameters.AddWithValue("@Number", phone.Number);
                    command.ExecuteNonQuery();
                }
            }
        }

    }
}

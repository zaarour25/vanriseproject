using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using vanriseProject.Models;
using System.Data.SqlClient;
using System.Data;

namespace vanriseProject.Controllers
{
    [RoutePrefix("api/devices")]
    public class DeviceController : ApiController
    {

        private string connectionString = "Data Source=(local);Initial Catalog=devices;Integrated Security=True;";
        [HttpPost]
        [Route("AddDevice")]
        public void AddDevice(Device device)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                string sqlQuery = "INSERT INTO Devices (ID, Name) VALUES (@ID, @Name);";
                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    command.Parameters.AddWithValue("@ID", device.ID);
                    command.Parameters.AddWithValue("@Name", device.Name);
                    command.ExecuteNonQuery();
                }
            }
        }

        [HttpGet]
        [Route("GetDevice")]
        public DataTable GetAllDevices()
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                string sqlQuery = "SELECT ID, Name FROM Devices;";
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
        [Route("UpdateDevice")]
        public void UpdateDevice(Device device)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                string sqlQuery = "UPDATE Devices SET Name = @Name WHERE ID = @ID;";
                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    command.Parameters.AddWithValue("@ID", device.ID);
                    command.Parameters.AddWithValue("@Name", device.Name);
                    command.ExecuteNonQuery();
                }
            }
        }


    }
}
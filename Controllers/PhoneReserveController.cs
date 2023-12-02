using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using vanriseProject.Models;
using System.Data.SqlTypes;

namespace vanriseProject.Controllers
{
    [RoutePrefix("api/phoneReserve")]
    public class PhoneReserveController : ApiController
    {

        private string connectionString = "Data Source=(local);Initial Catalog=devices;Integrated Security=True;";
        


        [HttpGet]
        [Route("GetPhoneReserve")]
        public DataTable GetAllPhones()
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                string sqlQuery = "SELECT ID, Client,PhoneNumber,BED,EED FROM PhoneNumberReserve;";
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


        [HttpPost]
        [Route("AddReserve")]
        public void AddPhoneRes(PhoneReserve phoneRes)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                string sqlQuery = "INSERT INTO PhoneNumberReserve (ID, Client, PhoneNumber, BED, EED) VALUES (@ID, @Client, @PhoneNumber, @BED, @EED);";
                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    command.Parameters.AddWithValue("@ID", phoneRes.ID);
                    command.Parameters.AddWithValue("@Client", phoneRes.Client);
                    command.Parameters.AddWithValue("@PhoneNumber", phoneRes.PhoneNumber);
                    command.Parameters.AddWithValue("@BED", DateTime.Now);
                    command.Parameters.AddWithValue("@EED", DBNull.Value);
                    

                    command.ExecuteNonQuery();
                }
            }
        }


        [HttpPut]
        [Route("UpdatePhoneReserve")]
        public void UpdatePhone(PhoneReserve phoneRes)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                string sqlQuery = "UPDATE PhoneNumberReserve SET EED = @EED WHERE ID = @ID;";
                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    command.Parameters.AddWithValue("@ID", phoneRes.ID);
                    command.Parameters.AddWithValue("@EED", DateTime.Now);
                    command.ExecuteNonQuery();
                }
            }
        }


    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace vanriseProject.Models
{
    public enum ClientType
    {
        Individual,
        Organization
    }

    public class Client
    {

        public int ID { get; set; }
        public string Name { get; set; }
        public ClientType Type { get; set; }
        public DateTime? Birthdate { get; set; }



    }
}
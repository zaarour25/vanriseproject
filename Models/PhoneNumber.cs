using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace vanriseProject.Models
{
    public class PhoneNumber
    {

        public int ID { get; set; }
        public string Number { get; set; }
      
        public String Device { get; set; }


    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace vanriseProject.Models
{
    public class LoginModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    // User.cs
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
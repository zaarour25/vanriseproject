using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace vanriseProject.Controllers
{
    public class HomeController : Controller
    {
        
        public ActionResult Index()
        {
            return View();
        }

        
        public ActionResult Login()
        {
            return View("~/Views/Home/Login.cshtml");
        }

        
        public ActionResult Devices()
        {

            return View("~/Views/Device/device.cshtml");
        }

        
        public ActionResult Client()
        {
            return View("/Views/Home/Client.cshtml");
        }

       
        public ActionResult PhoneNumbers()
        {
            return View("/Views/Home/PhoneNumbers.cshtml");
        }

       
        public ActionResult PhoneReserve()
        {
            return View("/Views/Home/PhoneReserve.cshtml");
        }


        public ActionResult ClientReport()
        {
            return View("/Views/Home/ClientReport.cshtml");
        }

       
        public ActionResult PhoneReport()
        {
            return View("/Views/Home/PhoneReport.cshtml");
        }

        
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        
        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }  
       

    }
}
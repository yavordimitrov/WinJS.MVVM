using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;

namespace WinJS.MoveEm.Controllers
{
    [Route("api/[controller]")]
    public class HomeController : Controller
    {
        private List<Person> Persons = new List<Person> {
            new  Person() { FirstName ="Pesho", LastName= "Peshev" },
            new  Person() { FirstName ="Dani", LastName= "Danev" },
            new  Person() { FirstName ="Sybev", LastName= "Milev" },
            new  Person() { FirstName ="Krum", LastName= "Drumev" },
            new  Person() { FirstName ="Pesho", LastName= "Georgiev" }
        };

        [HttpGet]
        public IActionResult Get()
        {
            Response.Headers.Add("Expires", new string[] { "Thu, 01 Dec 1994 16:00:00 GMT" });
            Random rnd = new Random();
            int i = rnd.Next(0, 5);
            return Json(Persons[i]);
        }

    }
    public class Person
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}

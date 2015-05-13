using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ActuarialMathematics.WebUI.Controllers
{
    public class SurvivalModelsController : Controller
    {
        // GET: SurvivalModels
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GompertzLaw()
        {
            return View();
        }
    }
}
﻿using Microsoft.AspNetCore.Mvc;

namespace RealEstateAPI.Controllers
{
    public class AuthenticationController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}

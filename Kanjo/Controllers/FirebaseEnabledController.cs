using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Kanjo.Controllers
{
    public abstract class FirebaseEnabledController : Controller
    {
        protected string UserId => User.FindFirstValue("user_id");
    }
}

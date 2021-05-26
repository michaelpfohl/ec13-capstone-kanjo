using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Kanjo.Models;
using Kanjo.Data;

namespace Kanjo.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        UserRepository _repo;

        public UserController(UserRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            var user = _repo.GetUser(id);
            if (user == null)
            {
                return NotFound("This user does not exist.");
            }
            return Ok(user);
        }

        [HttpGet("firebase/{firebase_Uid}")]
        public IActionResult GetUserByFirebaseUid(string firebase_Uid)
        {
            var user = _repo.GetUserByFirebaseUid(firebase_Uid);
            if (user == null)
            {
                return NotFound("This user does not exist.");
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult AddNewUser(User user)
        {
            _repo.AddUser(user);
            return Created($"api/users/{user.Id}", user);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser(User user)
        {
            _repo.UpdateUser(user);
            return Ok();
        }

        [HttpPut("delete/{id}")]
        public IActionResult DeleteUser(int id)
        {
            _repo.DeleteUser(id);
            return Ok();
        }
    }
}

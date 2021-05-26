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
    [Route("api/entries")]
    public class EntryController : ControllerBase
    {
        EntryRepository _repo;

        public EntryController(EntryRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("all/{userId}")]
        public IActionResult GetAllEntriesByUser(int userId)
        {
            return Ok(_repo.GetAllByUser(userId));
        }

        [HttpGet("{id}")]
        public IActionResult GetEntry(int id)
        {
            return Ok(_repo.Get(id));
        }

        [HttpPost]
        public IActionResult AddNewEntry(Entry entry)
        {
            _repo.Add(entry);
            return Created($"api/entries/{entry.Id}", entry);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateEntryDate(Entry entry)
        {
            _repo.UpdateDate(entry);
            return Ok();
        }

        [HttpPut("delete/{id}")]
        public IActionResult DeleteEntry(int id)
        {
            _repo.Delete(id);
            return Ok();
        }
    }
}

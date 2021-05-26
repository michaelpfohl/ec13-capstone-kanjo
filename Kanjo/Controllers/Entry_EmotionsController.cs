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
    [Route("api/entry_emotions")]
    public class Entry_EmotionsController : ControllerBase
    {
        Entry_EmotionsRepository _repo;

        public Entry_EmotionsController(Entry_EmotionsRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("all/{userId}")]
        public IActionResult GetAllEntryEmotionsByUser(int userId)
        {
            return Ok(_repo.GetAllByUser(userId));
        }

        [HttpGet("entry/{entryId}")]
        public IActionResult GetAllEntryEmotionsByEntry(int entryId)
        {
            return Ok(_repo.GetAllByEntry(entryId));
        }

        [HttpGet("emotion/{emotionId}")]
        public IActionResult GetAllEntryEmotionsByEmotion(int emotionId)
        {
            return Ok(_repo.GetAllByEmotion(emotionId));
        }

        [HttpGet("{id}")]
        public IActionResult GetEntryEmotion(int id)
        {
            return Ok(_repo.Get(id));
        }

        [HttpPost]
        public IActionResult AddNewEntry(Entry_Emotion entry_emotion)
        {
            _repo.Add(entry_emotion);
            return Created($"api/entries/{entry_emotion.Id}", entry_emotion);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateEntryDate(Entry_Emotion entry_emotion)
        {
            _repo.Update(entry_emotion);
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

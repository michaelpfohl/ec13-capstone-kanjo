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
    [Route("api/emotions")]
    public class EmotionController : FirebaseEnabledController
    {
        EmotionRepository _repo;

        public EmotionController(EmotionRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("all/{userId}")]
        public IActionResult GetAllEmotionsUserAndPublic(int userId)
        {
            return Ok(_repo.GetAllEmotionsUserAndPublic(userId));
        }

        [HttpGet("all-with-entries/{userId}")]
        public IActionResult GetAllEmotionsWithEntries(int userId)
        {
            return Ok(_repo.GetAllEmotionsWithEntries(userId));
        }

        [HttpGet("date/{userId}/{startDate}/{endDate}")]
        public IActionResult GetAllWithFrequencyBetweenDateRange(int userId, string startDate, string endDate)
        {
            return Ok(_repo.GetAllWithFrequencyBetweenDateRange(userId, startDate, endDate));
        }

        [HttpGet("public")]
        public IActionResult GetAllPublicEmotions()
        {
            return Ok(_repo.GetAllPublic());
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetAllEmotionsByUser(int userId)
        {
            return Ok(_repo.GetAllByUser(userId));
        }

        [HttpGet("{id}")]
        public IActionResult GetEmotion(int id)
        {
            return Ok(_repo.Get(id));
        }

        [HttpPost]
        public IActionResult AddNewEmotion(Emotion emotion)
        {
            _repo.Add(emotion);
            return Created($"api/emotions/{emotion.Id}", emotion);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateEmotion(Emotion emotion)
        {
            _repo.Update(emotion);
            return Ok();
        }

        [HttpPut("delete/{id}")]
        public IActionResult DeleteEmotion(int id)
        {
            _repo.Delete(id);
            return Ok();
        }
    }
}

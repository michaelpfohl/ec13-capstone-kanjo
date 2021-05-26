using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kanjo.Models
{
    public class Entry_Emotion
    {
        public int Id { get; set; }
        public int Entry_Id { get; set; }
        public int Emotion_Id { get; set; }
        public string Where_Answer { get; set; }
        public string Who_Answer { get; set; }
        public string What_Answer { get; set; }
        public string Why_Answer { get; set; }
        public string How_Answer { get; set; }
        public bool Active { get; set; }
    }
}

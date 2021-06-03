using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kanjo.Models
{
    public class Emotion
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int User_Id { get; set; }
        public string Description { get; set; }
        public bool Active { get; set; }
        public int? Frequency { get; set; }
    }
}

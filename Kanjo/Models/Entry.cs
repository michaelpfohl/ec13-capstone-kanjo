using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kanjo.Models
{
    public class Entry
    {
        public int Id { get; set; }
        public int User_Id { get; set; }
        public DateTime Date { get; set; }
        public bool Active { get; set; }
    }
}

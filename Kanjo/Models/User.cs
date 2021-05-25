using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kanjo.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Profile_Picture { get; set; }
        public DateTime User_Created_Date { get; set; }
        public string Firebase_Uid { get; set; }
        public bool Active { get; set; }
    }
}

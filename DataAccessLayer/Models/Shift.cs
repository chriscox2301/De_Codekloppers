using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class Shift
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int CourierId { get; set; }
        public int VehicleId { get; set; }
        public Courier Courier { get; set; }
        public ICollection<Order> Orders { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class DeliveryInformation
    {
        public int Id { get; set; }
        public DateTime TimeOfDelivery { get; set; }
        public int CourierId { get; set; }
        public int OrderId { get; set; }
        public Courier Courier { get; set; }
        public Order Order { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class SupplyOrder
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime DateOfDelivery { get; set; }
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}

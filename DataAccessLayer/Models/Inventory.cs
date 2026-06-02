using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class Inventory
    {
        public int Id { get; set; }
        public string Location { get; set; }
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}

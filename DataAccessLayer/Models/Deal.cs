using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class Deal
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public Double? Discount { get; set; }
        public string Description { get; set; }
        public ICollection<Product> Products { get; set; } = new List<Product>();
        public ICollection<Category> Categories { get; set; } = new List<Category>();
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer.Models;

namespace DataAccessLayer.ViewModel
{
    public class ShiftOrderViewModel
    {
        public Shift? Shift { get; set; }
        public ICollection<Order>? Orders { get; set; }
    }
}

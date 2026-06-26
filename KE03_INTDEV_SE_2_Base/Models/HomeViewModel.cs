using DataAccessLayer.Models;

namespace KE03_INTDEV_SE_2_Base.Models
{
    public class HomeViewModel
    {
        public List<Product> Products { get; set; } = new List<Product>();
        public List<Order> Orders { get; set; } = new List<Order>();
    }
}

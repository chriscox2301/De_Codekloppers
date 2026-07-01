using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using DataAccessLayer;
using DataAccessLayer.Models; 
using DataAccessLayer.ViewModel;

namespace KE03_INTDEV_SE_2_Base.Controllers
{
    public class OrdersController : Controller
    {
        private readonly MatrixIncDbContext _context;

        public OrdersController(MatrixIncDbContext context)
        {
            _context = context;
        }

        // GET: Orders
        public async Task<IActionResult> Index()
        {
            var matrixIncDbContext = _context.Orders.Include(o => o.Customer);

            return View(await matrixIncDbContext.ToListAsync());
        }

        // GET: Orders/Details/5
        public async Task<IActionResult> Details(int? id, decimal price)
        {
            if (id == null)
            {
                return NotFound();
            }

            var order = await _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.OrderProducts)
                .ThenInclude(op => op.Product)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (order == null)
            {
                return NotFound();
            }

            return View(order);
        }

        // GET: Orders/Create
        public IActionResult Create()
        {
            ViewData["CustomerId"] = new SelectList(_context.Customers, "Id", "Name");
            ViewBag.Products = _context.Products.ToList();
            var model = new OrderViewModel
            {
                OrderDate = DateTime.Now
            };
            return View(model);
        }

        // POST: Orders/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(OrderViewModel model)
        {

            if (ModelState.IsValid)
            {
                var order = new Order
                {
                    OrderDate = DateTime.Now,
                    CustomerId = model.CustomerId,
                };

                foreach (var item in model.Products)
                {
                    order.OrderProducts.Add(
                        new OrderProduct
                        {
                            ProductId = item.ProductId,
                            Quantity = item.Quantity
                        });
                }

                _context.Orders.Add(order);

                await _context.SaveChangesAsync();
                TempData["Create"] = "Order is succesvol aangemaakt";

                return RedirectToAction(nameof(Index));
            }

            ViewBag.Products = _context.Products.ToList();

            ViewData["CustomerId"] = new SelectList(_context.Customers, "Id", "Name", model.CustomerId);

            return View(model);
        }

        // GET: Orders/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var order = await _context.Orders
                .Include(o => o.OrderProducts)
                .ThenInclude(op => op.Product)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                return NotFound();
            }
            var model = new OrderViewModel
            {
                Id = order.Id,
                OrderDate = order.OrderDate,
                CustomerId = order.CustomerId,
                Products = order.OrderProducts
            .Select(op => new OrderProductViewModel
            {
                ProductId = op.ProductId,
                Quantity = op.Quantity
            })
            .ToList()

            };



            ViewData["CustomerId"] = new SelectList(_context.Customers, "Id", "Name", order.CustomerId);
            ViewBag.Products = await _context.Products.ToListAsync();



            return View(model);
        }


        // POST: Orders/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, OrderViewModel model)
        {
            if (id != model.Id)
            {
                return NotFound();
            }



            if (ModelState.IsValid)
            {


                var order = await _context.Orders
                 .Include(o => o.OrderProducts)
                 .FirstOrDefaultAsync(o => o.Id == id);
                try
                {
                    
                    order.CustomerId = model.CustomerId;
                    

                    order.OrderProducts.Clear();





                    foreach (var product in model.Products)
                    {
                        order.OrderProducts.Add(new OrderProduct
                        {
                            OrderId = order.Id,
                            ProductId = product.ProductId,
                            Quantity = product.Quantity
                        });
                    }


                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!OrderExists(model.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                TempData["Create"] = "Orderinformatie is succesvol aangepast ";
                return RedirectToAction(nameof(Index));
            }

            ViewData["CustomerId"] = new SelectList(_context.Customers, "Id", "Name", model.CustomerId);
            ViewBag.Products = await _context.Products.ToListAsync();
            return View(model);
        }

        // GET: Orders/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var order = await _context.Orders
                .Include(o => o.Customer)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (order == null)
            {
                return NotFound();
            }

            return View(order);
        }

        // POST: Orders/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order != null)
            {
                _context.Orders.Remove(order);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }
    }
}

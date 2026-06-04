using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using DataAccessLayer;
using DataAccessLayer.Models;

namespace KE03_INTDEV_SE_2_Base.Controllers
{
    public class CategoriesController : Controller
    {
        private readonly MatrixIncDbContext _context;

        public CategoriesController(MatrixIncDbContext context)
        {
            _context = context;
        }

        // GET: Categories
        public async Task<IActionResult> Index()
        {
            return View(await _context.Categories
                .Include(c => c.Products)
                .ToListAsync());
        }

        // GET: Categories/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Categories/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,Description")] Category category)
        { 

            //Haalt data op om te kijken of de categorienaam al bestaat
            bool exists = _context.Categories.Any(c => c.Name == category.Name);

            if (exists)
            {
                //Als naam bestaat, wordt er een foutmelding aan de "Name" property gekoppeld: https://visualstudiomagazine.com/articles/2017/08/01/exploiting-the-validation-tools.aspx
                ModelState.AddModelError("Name", "Naam bestaat al.");
                return View(category);
            }

            if (ModelState.IsValid)
            {
                _context.Add(category);
                await _context.SaveChangesAsync();

                //Sla tijdelijke data op voor de succesmelding, info: https://medium.com/@MJQuinn/asp-net-feedback-through-tempdata-91ef08827a90
                TempData["SuccessMessage"] = "Categorie is succesvol opgeslagen";
                return RedirectToAction(nameof(Index));
            }
            return View(category);
        }

        // GET: Categories/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var category = await _context.Categories
                .FirstOrDefaultAsync(m => m.Id == id);
            if (category == null)
            {
                return NotFound();
            }

            return View(category);
        }

        // POST: Categories/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id, string? name)
        {
            //Haalt categorie op aan de hand van id
            var category = await _context.Categories.FindAsync(id);

            //Checkt of ingevulde naam niet leeg is.
            if (string.IsNullOrWhiteSpace(name))
            {
                ModelState.AddModelError("name", "Typ de naam van de categorie in!");
                return View(category);
            }

            //Controleert of ingevulde naam overeenkomt met de categorie naam.
            if(category.Name != name)
            {
                ModelState.AddModelError("name", "Naam komt niet overeen");
                return View(category);
            }
             
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            TempData["SuccessMessage"] = "Categorie is succesvol verwijderd";
            return RedirectToAction(nameof(Index));
        }

        private bool CategoryExists(int id)
        {
            return _context.Categories.Any(e => e.Id == id);
        }

        //// GET: Categories/Details/5
        //public async Task<IActionResult> Details(int? id)
        //{
        //    if (id == null)
        //    {
        //        return NotFound();
        //    }

        //    var category = await _context.Categories
        //        .FirstOrDefaultAsync(m => m.Id == id);
        //    if (category == null)
        //    {
        //        return NotFound();
        //    }

        //    return View(category);
        //}
    }
}

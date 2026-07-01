function filterTable() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#productTable tbody tr');

    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const selectAll = document.getElementById('selectAll');
    if (!selectAll) return;

    selectAll.addEventListener('change', () => {
        document.querySelectorAll('.row-checkbox').forEach(cb => {
            cb.checked = selectAll.checked;
        });
    });
});

//JavaScript Binck(Details+Delete+IndexOrders)
document.addEventListener('DOMContentLoaded', function () {
    const categorySelect = document.getElementById('categorySelect');
    const categoryDropdown = document.getElementById('categoryDropdown');
    const categoryMenu = document.getElementById('categoryMenu');

    // Stel de huidige geselecteerde waarde in bij het laden
    if (categorySelect && categoryDropdown) {
        const selectedOption = categorySelect.options[categorySelect.selectedIndex];
        if (selectedOption && selectedOption.text) {
            categoryDropdown.textContent = selectedOption.text;
        }
    }

    // Voeg click event toe aan alle dropdown items
    if (categoryMenu) {
        categoryMenu.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', function (e) {
                e.preventDefault();

                const value = this.getAttribute('data-value');
                const text = this.textContent;

                // Update de hidden select
                categorySelect.value = value;

                // Update de dropdown button tekst
                categoryDropdown.textContent = text;

                // Sluit de dropdown
                const dropdown = bootstrap.Dropdown.getInstance(categoryDropdown);
                if (dropdown) {
                    dropdown.hide();
                }
            });
        });
    }

    // Courier dropdown voor Shifts Edit
    const dropdownItems = document.querySelectorAll('.dropdown-item[data-courier-id]');
    const courierIdInput = document.getElementById('courierIdInput');
    const courierDropdownButton = document.getElementById('courierDropdown');

    // Set initial button text if courier is already selected
    if (courierIdInput && courierDropdownButton) {
        const currentCourierId = courierIdInput.value;
        if (currentCourierId) {
            const selectedItem = document.querySelector(`[data-courier-id="${currentCourierId}"]`);
            if (selectedItem) {
                courierDropdownButton.textContent = selectedItem.getAttribute('data-courier-name');
            }
        }
    }

    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const courierId = this.getAttribute('data-courier-id');
            const courierName = this.getAttribute('data-courier-name');

            if (courierIdInput && courierDropdownButton) {
                courierIdInput.value = courierId;
                courierDropdownButton.textContent = courierName;
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const selectAll = document.getElementById('selectAll');
    if (!selectAll) return;

    selectAll.addEventListener('change', () => {
        document.querySelectorAll('.row-checkbox').forEach(cb => {
            cb.checked = selectAll.checked;
        });
    });
});


function priceRange() {
    const slider = document.getElementById('priceRangeSlider');
    const output = document.getElementById('priceRangeValue');

    if (slider && output) {

        output.textContent = '€' + slider.value;

        // Voeg event listener toe voor updates
        slider.addEventListener('input', function () {
            output.textContent = '€' + this.value;
        });
    }
}

// Roep priceRange aan wanneer de pagina geladen is
document.addEventListener('DOMContentLoaded', priceRange);



function tooltip() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });
}

function filterTable() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#orderTable tbody tr');

    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
    });
}

//JavaScript Bram(Create+UpdateOrders)

document.addEventListener("DOMContentLoaded", function () {

    const addButton = document.getElementById("addProductBtn");
    const productSelect = document.getElementById("productSelect");
    const productList = document.getElementById("productList");
    const hiddenContainer = document.getElementById("hiddenProductsContainer");

 
    function updateIndexes() {

        const rows = productList.querySelectorAll("li");

        rows.forEach((row, index) => {

            const productId = row.dataset.productId;

            const hiddenProduct =
                document.getElementById(`hidden-product-${productId}`);

            const hiddenQuantity =
                document.getElementById(`hidden-quantity-${productId}`);

            if (hiddenProduct) {
                hiddenProduct.name = `Products[${index}].ProductId`;
            }

            if (hiddenQuantity) {
                hiddenQuantity.name = `Products[${index}].Quantity`;
            }
        });
    }


    function attachRemoveButton(button) {

        button.addEventListener("click", function () {

            const li = button.closest("li");
            const productId = li.dataset.productId;

            li.remove();

            document.getElementById(`hidden-product-${productId}`)?.remove();
            document.getElementById(`hidden-quantity-${productId}`)?.remove();

            updateIndexes();
        });
    }

   
    function attachQuantityInput(input) {

        input.addEventListener("input", function () {

            if (this.value < 1) {
                this.value = 1;
            }

            const li = this.closest("li");
            const productId = li.dataset.productId;

            const hiddenQuantity =
                document.getElementById(`hidden-quantity-${productId}`);

            if (hiddenQuantity) {
                hiddenQuantity.value = this.value;
            }
        });
    }

 
    addButton.addEventListener("click", function () {

        const productId = productSelect.value;
        const productText = productSelect.options[productSelect.selectedIndex].text;

        
        if (document.getElementById(`product-${productId}`)) {
            alert("Dit product is al toegevoegd.");
            return;
        }

       
        const li = document.createElement("li");
        li.id = `product-${productId}`;
        li.dataset.productId = productId;
        li.className = "list-group-item producten-in-order";

       
        const infoDiv = document.createElement("div");
        infoDiv.className = "product-info";

        if (window.location.pathname.includes("Edit")) {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
          

            infoDiv.appendChild(checkbox);
        } 

        const nameSpan = document.createElement("span");
        nameSpan.textContent = productText;

        infoDiv.appendChild(nameSpan);
         

       
        const actionsDiv = document.createElement("div");
        actionsDiv.className = "product-actions";

        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.min = "1";
        quantityInput.value = "1";
        quantityInput.className = "form-control quantity-input";

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.className = "btn btn-danger btn-sm remove-product";
        removeButton.textContent = "Verwijder";

        actionsDiv.appendChild(quantityInput);
        actionsDiv.appendChild(removeButton);

        
        li.appendChild(infoDiv);
        li.appendChild(actionsDiv);

        productList.appendChild(li);

      
        const hiddenProduct = document.createElement("input");
        hiddenProduct.type = "hidden";
        hiddenProduct.id = `hidden-product-${productId}`;
        hiddenProduct.value = productId;

        const hiddenQuantity = document.createElement("input");
        hiddenQuantity.type = "hidden";
        hiddenQuantity.id = `hidden-quantity-${productId}`;
        hiddenQuantity.value = "1";

        hiddenContainer.appendChild(hiddenProduct);
        hiddenContainer.appendChild(hiddenQuantity);

      
        attachRemoveButton(removeButton);
        attachQuantityInput(quantityInput);

        updateIndexes();
    });

   
    document.querySelectorAll(".remove-product").forEach(btn => {
        attachRemoveButton(btn);
    });

    document.querySelectorAll(".quantity-input").forEach(input => {
        attachQuantityInput(input);
    });

    updateIndexes();
});

//JavaScript Fabian
function zoekbalk() {
    const query = document.getElementById('zoekterm').value.toLowerCase();
    const rows = document.querySelectorAll('#categoryTable tbody tr')

    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        if (text.includes(query)) {
            row.style.display = '';
        }
        else {
            row.style.display = 'none';
        }
    });
}

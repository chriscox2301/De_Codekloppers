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
document.addEventListener('DOMContentLoaded', () => {
    const selectAll = document.getElementById('selectAll');
    if (!selectAll) return;

    selectAll.addEventListener('change', () => {
        document.querySelectorAll('.row-checkbox').forEach(cb => {
            cb.checked = selectAll.checked;
        });
    });
});

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
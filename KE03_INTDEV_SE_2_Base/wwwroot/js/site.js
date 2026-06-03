// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
document.addEventListener("DOMContentLoaded", function () {

    const productSelect = document.getElementById("productSelect");
    const addButton = document.getElementById("addProductBtn");
    const productList = document.getElementById("productList");
    const hiddenContainer = document.getElementById("hiddenProductsContainer");

    function attachRemoveHandler(button) {

        button.addEventListener("click", function () {

            const li = button.closest("li");

            const productId =
                li.id.replace("product-", "");

            const hidden =
                document.getElementById("hidden-" + productId);

            if (hidden) {
                hidden.remove();
            }

            li.remove();
        });
    }

    // Verwijderknoppen die al bestaan (Edit pagina)
    document.querySelectorAll(".remove-product")
        .forEach(button => {
            attachRemoveHandler(button);
        });

    addButton.addEventListener("click", function () {

        const productId = productSelect.value;
        const productName =
            productSelect.options[productSelect.selectedIndex].text;

 
        if (document.getElementById("product-" + productId)) {
            return;
        }

      
        const li = document.createElement("li");
        li.id = "product-" + productId;
        li.className =
            "list-group-item d-flex justify-content-between align-items-center";

       
        const productText = document.createElement("span");
        productText.textContent = productName;

        
        const hiddenInput = document.createElement("input");
        hiddenInput.type = "hidden";
        hiddenInput.name = "SelectedProductIds";
        hiddenInput.value = productId;
        hiddenInput.id = "hidden-" + productId;

      
        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.className = "btn btn-danger btn-sm";
        removeButton.textContent = "Verwijder";

        removeButton.addEventListener("click", function () {
            li.remove();
            hiddenInput.remove();
        });

  
        li.appendChild(productText);
        li.appendChild(removeButton);

        hiddenContainer.appendChild(hiddenInput);
        productList.appendChild(li);
    });

});
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    fetch("products.json")
        .then(response => response.json())
        .then(data => {
            // Combine all products from different categories
            const allProducts = [...data.recently_viewed, ...data.suggested, ...data.popular_products];

            // Find the product by ID
            const product = allProducts.find(item => item.id == productId);

            if (product) {
                document.getElementById("product-image").src = product.image;
                document.getElementById("product-name").textContent = product.name;
                document.getElementById("product-rarity").textContent = product.rarity;
                document.getElementById("product-price").textContent = `$${product.price.toFixed(2)}`;
                document.getElementById("product-device").textContent = product.device ? product.device : "N/A";
                document.getElementById("product-magsafe").textContent = product.magsafe ? "Yes" : "No";

                // Ensure button exists before setting attribute
                const addToCartBtn = document.getElementById("add-to-cart-btn");
                if (addToCartBtn) {
                    addToCartBtn.setAttribute("data-id", product.id);
                    addToCartBtn.addEventListener("click", () => showCartPopup(product));
                }
            } else {
                console.error("Product not found!");
            }
        })
        .catch(error => console.error("Error loading product details:", error));
});

// =============================
// Add to Cart Popup Feature
// =============================

// Select popup elements
const popup = document.getElementById("cart-popup");
const popupImage = document.getElementById("popup-product-image");
const popupName = document.getElementById("popup-product-name");
const popupPrice = document.getElementById("popup-product-price");
const continueShoppingBtn = document.getElementById("continue-shopping");
const goToCartBtn = document.getElementById("go-to-cart");

// Function to Show Popup with Product Details
function showCartPopup(product) {
    if (!popup) {
        console.error("Popup element not found!");
        return;
    }

    popupImage.src = product.image;
    popupName.innerText = product.name;
    popupPrice.innerText = `Price: $${product.price.toFixed(2)}`;
    
    // Make sure the popup is displayed
    popup.style.display = "block";
    popup.classList.add("show"); // Add class for animation
}

// Function to Hide Popup
function hideCartPopup() {
    if (popup) {
        popup.style.display = "none";
        popup.classList.remove("show");
    }
}

// Event Listeners for Popup Buttons
if (continueShoppingBtn) continueShoppingBtn.addEventListener("click", hideCartPopup);
if (goToCartBtn) goToCartBtn.addEventListener("click", () => {
    window.location.href = "checkout.html"; // Redirect to checkout page
});

// Close popup if user clicks outside of it
window.addEventListener("click", (event) => {
    if (event.target === popup) {
        hideCartPopup();
    }
});

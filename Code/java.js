// ==============================
// Navigation Menu (All Pages)
// ==============================

document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector(".menu-icon");
    const menu = document.querySelector(".menu");
    const closeIcon = document.querySelector(".close-icon");

    // Open Menu (Slide from Left)
    menuIcon.addEventListener("click", function () {
        menu.classList.add("active");
        menuIcon.classList.add("open");
    });

    // Close Menu (Slide Back)
    closeIcon.addEventListener("click", function () {
        menu.classList.remove("active");
        menuIcon.classList.remove("open");
    });

    // Close menu when clicking a menu link
    document.querySelectorAll(".menu a").forEach(item => {
        item.addEventListener("click", function () {
            menu.classList.remove("active");
            menuIcon.classList.remove("open");
        });
    });
});


// ==============================
// Daily Log-in (Home Page)
// ==============================

document.addEventListener("DOMContentLoaded", function () {
    const rewards = document.querySelectorAll(".reward");
    let unlockedDays = JSON.parse(localStorage.getItem("unlockedDays")) || [1, 2, 3]; // Initially unlocked days

    function updateRewardsUI() {
        rewards.forEach((reward, index) => {
            const day = index + 1;
            if (unlockedDays.includes(day)) {
                reward.classList.add("unlocked");
                reward.classList.remove("locked");
                reward.innerHTML = `Day ${day} ✔`;
            }
        });
    }

    rewards.forEach(reward => {
        reward.addEventListener("click", function () {
            const day = parseInt(this.dataset.day);
            if (!unlockedDays.includes(day) && unlockedDays.includes(day - 1)) {
                unlockedDays.push(day);
                localStorage.setItem("unlockedDays", JSON.stringify(unlockedDays));
                window.location.href = `reward_day${day}.html`; // Redirect to reward page
            }
        });
    });

    updateRewardsUI();
});

// ==============================
// Carousel (Home Page)
// ==============================

let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-slide");
const dots = document.querySelectorAll(".dot");

// Function to display the current slide
function showSlide(index) {
  slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
      dots[i].classList.toggle("active", i === index);
  });
}

// Function to manually move to a specific slide
function moveToSlide(index) {
  currentSlide = index;
  showSlide(currentSlide);
}

// Auto-slide function (moves to next slide every 5 seconds)
function autoSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Set interval for auto sliding every 5 seconds
setInterval(autoSlide, 5000);

// ==============================
// Checkout Page (Step Navigation Clickable)
// ==============================

document.addEventListener("DOMContentLoaded", function () {
    // Select all checkout step indicators (1. Delivery, 2. Payment, 3. Review)
    const steps = document.querySelectorAll(".step");

    // Select all checkout sections (Delivery, Payment, Review)
    const sections = document.querySelectorAll(".checkout-section");

    // Select all "Next" buttons in each section
    const nextButtons = document.querySelectorAll(".next-btn");

    let currentStep = 0; // Track the current checkout step

    /**
     * Function to show the corresponding checkout step
     * @param {number} index - The step index (0: Delivery, 1: Payment, 2: Review)
     */
    function showStep(index) {
        // Loop through all sections and show only the selected one
        sections.forEach((section, i) => {
            section.style.display = i === index ? "block" : "none";
        });

        // Highlight the active step in the progress bar
        steps.forEach((step, i) => {
            step.classList.toggle("active", i === index);
        });

        currentStep = index; // Update the current step
    }

    /**
     * Event listener to allow clicking on the steps (1, 2, 3) to navigate
     */
    steps.forEach((step, index) => {
        step.addEventListener("click", () => {
            showStep(index); // Show the selected step when clicked
        });
    });

    /**
     * Event listener for "Next" buttons to move to the next step
     */
    nextButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            if (index < sections.length - 1) {
                showStep(index + 1); // Move to the next step
            }
        });
    });

    /**
     * Simulated Payment Handling - This will show an alert and move to "Review" step
     */
    document.getElementById("pay-now-btn").addEventListener("click", function () {
        alert("Payment processing... (Simulation)"); // Simulate a payment process
        showStep(2); // Move to "3. Review" after clicking "Pay Now"
    });

    // Show the first step (Delivery) when the page loads
    showStep(0);
});

// ==============================
// Fetch Products from JSON (Products Page)
// ==============================

document.addEventListener("DOMContentLoaded", () => {
    fetch("products.json") // Change this path if JSON is inside a folder, e.g., "data/products.json"
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("JSON Loaded Successfully:", data);
            loadProducts(data.recently_viewed, "recently_viewed");
            loadProducts(data.suggested, "suggested");
            loadPopularProducts(data.popular_products); // Ensure popular products load
        })
        .catch(error => console.error("Error loading products:", error.message));
});

// Function to Load and Display Products on Page
function loadProducts(products, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID "${containerId}" not found.`);
        return;
    }

    container.innerHTML = ""; // Clear existing content

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        // Wrap product in an anchor tag to link to details page
        productCard.innerHTML = `
            <a href="productdetails.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>Rarity: ${product.rarity}</p>
                    <p>Price: $${product.price}</p>
                </div>
            </a>
        `;

        container.appendChild(productCard);
    });
}

// ==============================
// Fetch Products from JSON (Home Page)
// ==============================

document.addEventListener("DOMContentLoaded", function () {
    fetch("products.json") // Ensure JSON file is correctly linked
        .then(response => response.json())
        .then(data => {
            loadPopularProducts(data.popular_products);
        })
        .catch(error => console.error("Error loading popular products:", error));
});

// Function to Load Popular Products with Background Images
function loadPopularProducts(products) {
    const container = document.getElementById("popular-products");

    if (!container) return; // Prevent errors if container is missing

    container.innerHTML = ""; // Clear previous content

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        // Set background image dynamically
        productCard.style.backgroundImage = `url('${product.image}')`;
        productCard.style.backgroundSize = "cover"; 
        productCard.style.backgroundPosition = "center"; 

        // Wrap in an anchor tag to redirect to product details
        productCard.innerHTML = `
            <a href="productdetails.html?id=${product.id}" class="product-overlay">
                <h3>${product.name}</h3>
                <p>RARITY: ${product.rarity}</p>
                <p>${product.magsafe ? "MAGSAFE COMPATIBLE" : ""}</p>
                <p>${product.device}</p>
                <span class="price">$${product.price.toFixed(2)}</span>
            </a>
        `;

        container.appendChild(productCard);
    });
}

// ==============================
// Mystery Box Click Handling
// ==============================

document.addEventListener("DOMContentLoaded", function () {
    const mysteryBoxes = document.querySelectorAll(".mystery-box");

    mysteryBoxes.forEach(box => {
        box.addEventListener("click", function () {
            const boxId = this.getAttribute("data-id"); // Ensure this attribute exists
            window.location.href = `mysteryboxdetails.html?id=${boxId}`;
        });
    });

    // Check if on mystery box details page
    if (window.location.pathname.includes("mysteryboxdetails.html")) {
        loadMysteryBoxDetails();
    }
});

// ==============================
// Fetch Mystery Box Details from JSON
// ==============================

function loadMysteryBoxDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const boxId = urlParams.get("id");

    fetch("mysteryboxes.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const mysteryBox = data.mystery_boxes.find(box => box.id == boxId);

            if (mysteryBox) {
                document.getElementById("mysterybox-image").src = mysteryBox.image;
                document.getElementById("mysterybox-name").textContent = mysteryBox.name;
                document.getElementById("mysterybox-pulls").textContent = mysteryBox.possible_pulls;
                document.getElementById("mysterybox-price").textContent = `$${mysteryBox.price}`;
                document.getElementById("mysterybox-description").textContent = mysteryBox.description;
            } else {
                console.error("Mystery Box not found!");
            }
        })
        .catch(error => console.error("Error loading mystery box details:", error));
}


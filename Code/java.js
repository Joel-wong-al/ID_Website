// ==============================
// Navigation Menu (All Pages)
// ==============================

// Function to toggle the slide-out menu
function toggleMenu() {
  // Select the menu element
  const menu = document.querySelector('.menu');

  // Toggle the hidden and active classes
  if (menu.classList.contains('hidden')) {
      menu.classList.remove('hidden');
      menu.classList.add('active');
  } else {
      menu.classList.add('hidden');
      menu.classList.remove('active');
  }
}

// Attach the click event listener to the menu icon
const menuIcon = document.querySelector('.menu-icon');
menuIcon.addEventListener('click', toggleMenu);

// Close the menu when a menu link is clicked
const menuLinks = document.querySelectorAll('.menu a');
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
      const menu = document.querySelector('.menu');
      menu.classList.add('hidden');
      menu.classList.remove('active');
  });
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
// Checkout Page (Step-by-Step Navigation)
// ==============================

document.addEventListener("DOMContentLoaded", function () {
  const steps = document.querySelectorAll(".step"); // Step indicators (1. Delivery, 2. Payment, 3. Review)
  const sections = document.querySelectorAll(".checkout-section"); // Checkout form sections
  const nextButtons = document.querySelectorAll(".next-btn"); // "Next" buttons

  let currentStep = 0;

  // Function to show the selected checkout step
  function showStep(index) {
      sections.forEach((section, i) => {
          section.style.display = i === index ? "block" : "none"; // Show only the active step
      });

      steps.forEach((stepElement, i) => {
          stepElement.classList.toggle("active", i === index); // Highlight the active step
      });

      currentStep = index;
  }

  // Next button functionality (moves to the next step)
  nextButtons.forEach((button, index) => {
      button.addEventListener("click", function () {
          if (index < sections.length - 1) {
              showStep(index + 1);
          }
      });
  });

  // Initialize with the first step
  showStep(currentStep);
});

// ==============================
// Checkout Page (Step Navigation Clickable)
// ==============================

document.addEventListener("DOMContentLoaded", function () {
  const steps = document.querySelectorAll(".step"); // Step indicators
  const sections = document.querySelectorAll(".checkout-section"); // Checkout form sections
  const nextButtons = document.querySelectorAll(".next-btn"); // "Next" buttons
  let currentStep = 0;

  // Function to show the selected checkout section
  function showStep(index) {
      sections.forEach((section, i) => {
          if (i === index) {
              section.classList.add("active");
              steps[i].classList.add("active");
          } else {
              section.classList.remove("active");
              steps[i].classList.remove("active");
          }
      });
      currentStep = index;
  }

  // Allow users to click step navigation (1. Delivery, 2. Payment, 3. Review)
  steps.forEach((step, index) => {
      step.addEventListener("click", () => {
          showStep(index);
      });
  });

  // "Next" button moves to the next step
  nextButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
          if (index < sections.length - 1) {
              showStep(index + 1);
          }
      });
  });

  // Show the first step by default
  showStep(0);
});

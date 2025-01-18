// Function to toggle the menu
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
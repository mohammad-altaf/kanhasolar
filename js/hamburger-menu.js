document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu-overlay');
  const overlayBg = document.querySelector('.overlay-bg');
  const mobileMenuLinks = document.querySelectorAll('.mobile-nav a');
  const mobileQuoteBtn = document.querySelector('.mobile-quote-btn');
  
  // Toggle mobile menu
  function toggleMenu() {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('active');
    overlayBg.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  }
  
  // Close menu when clicking on a link
  function closeMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('active');
    overlayBg.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Event listeners
  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }
  
  if (overlayBg) {
    overlayBg.addEventListener('click', closeMenu);
  }
  
  // Close menu when clicking on menu links
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  
  // Handle Get Quote button click
  if (mobileQuoteBtn) {
    mobileQuoteBtn.addEventListener('click', function() {
      closeMenu();
      // Add any additional quote button functionality here
    });
  }
  
  // Close menu when pressing Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMenu();
    }
  });
});

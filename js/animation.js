/* ==================================
   SCROLL-TRIGGERED ANIMATION SCRIPT
   ================================== */

// Select all elements with animation classes
const animatedElements = document.querySelectorAll(
    '.fade-in, .slide-left, .slide-right, .zoom-in, .flip-in, .slide-up, .slide-down, .rotate-in, .scale-up, .bounce-in, .blur-in, .flip-up, .light-speed'
);
  
  // Create intersection observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // If element is visible
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          // When scrolling up, it hides again (optional)
          entry.target.classList.remove('show');
        }
      });
    },
    {
      threshold: 0.2, // 20% of element must be visible to trigger
    }
  );
  
  // Observe each element
  animatedElements.forEach((el) => observer.observe(el));
  
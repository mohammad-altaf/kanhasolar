// Counter Animation for Stats Section
const animateCounters = () => {
  const counters = document.querySelectorAll(".counter");
  const speed = 100; // animation speed
  let animationStarted = false;

  const updateCount = (counter) => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(() => updateCount(counter), 30);
    } else {
      counter.innerText = target;
    }
  };

  // Function to start animation when stats section is in view
  const startAnimation = () => {
    if (animationStarted) return;
    
    const statsSection = document.querySelector('.stats-grid');
    if (!statsSection) return;

    const sectionPosition = statsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (sectionPosition < screenPosition) {
      animationStarted = true;
      counters.forEach(counter => {
        counter.innerText = '0'; // Reset counter to 0 before starting
        updateCount(counter);
      });
    }
  };

  // Start animation when page loads if stats section is already in view
  startAnimation();
  
  // Also check on scroll
  window.addEventListener('scroll', startAnimation);
};

// Initialize counter animation when DOM is fully loaded
document.addEventListener('DOMContentLoaded', animateCounters);
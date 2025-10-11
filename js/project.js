// Animate sections when they enter viewport (scroll up or down)
const slideSections = document.querySelectorAll('.slide-left ');
const slideSections1 = document.querySelectorAll('.slide-right ');
const slideSections2 = document.querySelectorAll('.slide-up ');

const slideObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      // Remove class when out of view to re-trigger animation
      entry.target.classList.remove('show');
    }
  });
}, { threshold: 0.2 });

slideSections.forEach(section => slideObserver.observe(section));
slideSections1.forEach(section => slideObserver.observe(section));
slideSections2.forEach(section => slideObserver.observe(section));

// ===== FILTER TAB LOGIC =====
const filterBtns = document.querySelectorAll('.filter-btn');
const filterContents = document.querySelectorAll('.filter-content');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const target = btn.getAttribute('data-target');
    filterContents.forEach(content => {
      content.classList.remove('active');
      if (content.id === target) content.classList.add('active');
    });
  });
});

// Counter Animation for Performance Overview
const counters = document.querySelectorAll(".counter");
const speed = 100; // animation speed

const animateCounters = () => {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 30);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
};

// Trigger animation when section visible
const performanceSection = document.querySelector("#performance");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

observer.observe(performanceSection);

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

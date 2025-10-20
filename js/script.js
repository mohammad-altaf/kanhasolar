const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');

if(hamburger && navbar){
  hamburger.addEventListener('click', ()=> {
    navbar.classList.toggle('active');
    hamburger.classList.toggle('open');
  });

  document.querySelectorAll('.navbar a').forEach(a=>{
    a.addEventListener('click', ()=> {
      navbar.classList.remove('active');
      hamburger.classList.remove('open');
    });
  });
}

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.counter');
const speed = 150; // lower = faster

const runCounter = () => {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const inc = target / speed;
      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target + '+';
      }
    };
    updateCount();
  });
};

// Run animation when section is visible
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      runCounter();
      observer.disconnect(); // Run once
    }
  });
});
observer.observe(document.querySelector('.stats-grid'));

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

// ========== AUTO IMAGE SLIDER ==========
const serviceImages = [
    "images/solar-roof-top-residential.jpg",
    "images/commercial-industrial.jpg",
    "images/water-pump.jpg",
    "images/products-carport.jpg"
  ];
  
  let currentIndex = 0;
  const imgElement = document.getElementById("service-slide");
  
  function changeServiceImage() {
    currentIndex = (currentIndex + 1) % serviceImages.length;
    imgElement.classList.add("fade-out");
  
    setTimeout(() => {
      imgElement.src = serviceImages[currentIndex];
      imgElement.classList.remove("fade-out");
    }, 500);
  }
  
  setInterval(changeServiceImage, 4000);
  
  // ========== AUTO PROJECT IMAGE SLIDER ==========
const projectImages = [
    "images/solar-roof-top-residential.jpg",
    "images/commercial-industrial.jpg",
    "images/water-pump.jpg",
    "images/products-carport.jpg"
  ];
  
  let projectIndex = 0;
  const projectImg = document.getElementById("project-slide");
  
  function changeProjectImage() {
    projectIndex = (projectIndex + 1) % projectImages.length;
    projectImg.classList.add("fade-out");
  
    setTimeout(() => {
      projectImg.src = projectImages[projectIndex];
      projectImg.classList.remove("fade-out");
    }, 500);
  }
  
  setInterval(changeProjectImage, 4000);
  

  // Simple scroll animation for testimonials
const cards = document.querySelectorAll(".testimonial-card");

window.addEventListener("scroll", () => {
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      card.classList.add("show");
    }
  });
});

// ===== FAQ Toggle =====
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  const question = item.querySelector(".faq-question");
  question.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

// ===== Contact Form (optional alert for demo) =====
document.querySelector(".contact-form").addEventListener("submit", e => {
  e.preventDefault();
  alert("Thank you for contacting Kanha Enterprises! We'll get back to you soon.");
});

// Simple floating animation for contact info
document.addEventListener("DOMContentLoaded", () => {
    const contact = document.querySelector(".footer-top");
    contact.style.transition = "transform 0.8s ease-in-out";
    let up = false;
    setInterval(() => {
      contact.style.transform = up ? "translateY(0px)" : "translateY(-5px)";
      up = !up;
    }, 1500);
  });
  

// Animate sections when they enter viewport (scroll up or down)
const slideSections = document.querySelectorAll('.slide-left');
const slideSections2 = document.querySelectorAll('.slide-right');
const slideSections3 = document.querySelectorAll('.slide-up');

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
slideSections2.forEach(section => slideObserver.observe(section));
slideSections3.forEach(section => slideObserver.observe(section));

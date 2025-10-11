// ===== COUNTER ANIMATION =====
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.counter');
    const speed = 120; // lower = faster
    let animationFrame;

    const runCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;
        
        if (count < target) {
            counter.textContent = Math.ceil(count + inc);
            animationFrame = requestAnimationFrame(() => runCounter(counter));
        } else {
            counter.textContent = target + (counter.hasAttribute('data-add-plus') ? '+' : '');
            cancelAnimationFrame(animationFrame);
        }
    };

    // Set up Intersection Observer
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounter(entry.target);
                counterObserver.unobserve(entry.target); // Only run once
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px' // Start animation when 50px from viewport bottom
    });

    // Observe all counters
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});
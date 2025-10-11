// ======== COUNTER ANIMATION ========
const counters = document.querySelectorAll('.count');
counters.forEach(counter => {
  counter.innerText = '0';
  const updateCounter = () => {
    const target = +counter.getAttribute('data-count');
    const count = +counter.innerText;
    const speed = 80; // lower = faster
    const increment = target / speed;
    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCounter, 40);
    } else {
      counter.innerText = target;
    }
  };
  updateCounter();
});

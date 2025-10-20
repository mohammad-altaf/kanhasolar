// Google Apps Script Web App URL - Replace with your own URL after deployment
const FAQ_FORM_SUBMIT_URL = 'https://script.google.com/macros/s/AKfycbzrSOPjDrBGJ3DWwnsxbfxUns9_NXjSY7KGz9zwejCBwbaIwvpT75yqNI-o5-h1K_FpcQ/exec';

// Toast notification function
function showToast(message, isError = false) {
  const toast = document.createElement('div');
  toast.className = `toast ${isError ? 'error' : 'success'}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  // Show the toast
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);
  
  // Hide and remove the toast after 5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 5000);
}

// Form validation
function validateFAQForm(form) {
  const name = form.querySelector('input[type="text"]');
  const email = form.querySelector('input[type="email"]');
  const phone = form.querySelector('input[type="tel"]');
  const message = form.querySelector('textarea');
  
  // Reset error states
  [name, email, phone, message].forEach(field => {
    field.classList.remove('error');
  });
  
  let isValid = true;
  
  // Validate required fields
  if (!name.value.trim()) {
    name.classList.add('error');
    isValid = false;
  }
  
  if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    email.classList.add('error');
    isValid = false;
  }
  
  if (!phone.value.trim() || !/^[0-9]{10,15}$/.test(phone.value)) {
    phone.classList.add('error');
    isValid = false;
  }
  
  if (!message.value.trim()) {
    message.classList.add('error');
    isValid = false;
  }
  
  return isValid;
}

// Form submission handler
async function handleFAQFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitButton = form.querySelector('button[type="submit"]');
  
  // Validate form
  if (!validateFAQForm(form)) {
    showToast('Please fill in all required fields correctly', true);
    return false;
  }
  
  // Prepare form data
  const formData = {
    timestamp: new Date().toISOString(),
    name: form.querySelector('input[type="text"]').value.trim(),
    email: form.querySelector('input[type="email"]').value.trim(),
    phone: form.querySelector('input[type="tel"]').value.trim(),
    message: form.querySelector('textarea').value.trim()
  };
  
  // Show loading state
  const originalButtonText = submitButton.innerHTML;
  submitButton.disabled = true;
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  
  try {
    // Send data to Google Apps Script
    const response = await fetch(FAQ_FORM_SUBMIT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    
    // Show success message
    showToast('Thank you! Your message has been sent.');
    form.reset();
    
  } catch (error) {
    console.error('Error submitting form:', error);
    showToast('Failed to send message. Please try again later.', true);
  } finally {
    // Reset button state
    submitButton.disabled = false;
    submitButton.innerHTML = originalButtonText;
  }
}

// Toggle FAQ answer visibility
function toggleFAQ(button) {
  const faqItem = button.closest('.faq-item');
  const answer = faqItem.querySelector('.faq-answer');
  const isExpanded = button.getAttribute('aria-expanded') === 'true';
  
  // Toggle the expanded state
  button.setAttribute('aria-expanded', !isExpanded);
  
  // Toggle the answer visibility with smooth animation
  if (isExpanded) {
    answer.style.maxHeight = '0';
    button.innerHTML = button.innerHTML.replace('−', '+');
  } else {
    // Close other open FAQs
    document.querySelectorAll('.faq-question[aria-expanded="true"]').forEach(openBtn => {
      if (openBtn !== button) {
        openBtn.setAttribute('aria-expanded', 'false');
        openBtn.closest('.faq-item').querySelector('.faq-answer').style.maxHeight = '0';
        openBtn.innerHTML = openBtn.innerHTML.replace('−', '+');
      }
    });
    
    answer.style.maxHeight = answer.scrollHeight + 'px';
    button.innerHTML = button.innerHTML.replace('+', '−');
  }
}

// Initialize form and FAQ functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize FAQ accordion
  const faqButtons = document.querySelectorAll('.faq-question');
  faqButtons.forEach(button => {
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', () => toggleFAQ(button));
    
    // Add keyboard navigation
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFAQ(button);
      }
    });
  });
  
  // Initialize contact form
  const faqForm = document.querySelector('.faq-contact-section .contact-form');
  if (faqForm) {
    faqForm.addEventListener('submit', handleFAQFormSubmit);
  }
  
  // FAQ accordion functionality
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentNode;
      const isOpen = item.classList.contains('active');
      
      // Close all other items
      document.querySelectorAll('.faq-item').forEach(faqItem => {
        faqItem.classList.remove('active');
      });
      
      // Toggle current item if not already open
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
});

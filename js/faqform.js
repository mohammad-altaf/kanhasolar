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

// Initialize form when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
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

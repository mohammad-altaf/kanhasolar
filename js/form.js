/**
 * Form handling and validation for customer enquiry form
 */

/**
 * Toast message dikhane ke liye function
 * @param {string} message - Dikhane wala message
 * @param {boolean} isError - Agar error message hai to true karein
 */
function showToast(message, isError = false) {
  const toast = document.getElementById('toast');
  const icon = isError ? '<i class="fas fa-exclamation-circle"></i>' : '<i class="fas fa-check-circle"></i>';
  
  toast.innerHTML = icon + ' ' + message;
  toast.className = isError ? 'toast error show' : 'toast show';
  
  // Hide after 5 seconds
  setTimeout(() => {
    toast.className = 'toast';
  }, 5000);
}

/**
 * Form validation ka function
 * @param {HTMLElement} form - Form element jisko validate karna hai
 * @returns {boolean} - true agar sab required fields fill hain, warna false
 */
function validateForm(form) {
  let isValid = true;
  const requiredFields = form.querySelectorAll('[required]');
  
  // Pehle saare error states ko hatao
  requiredFields.forEach(field => {
    field.classList.remove('error');
  });
  
  // Ab check karo har required field ko
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      field.classList.add('error');
      isValid = false;
    }
  });
  
  return isValid;
}

/**
 * Form submission handle karne wala function
 * @param {Event} event - Form submit event
 * @returns {boolean} - Form submission status
 */
async function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  
  // Pehle form validate karo
  if (!validateForm(form)) {
    showToast('Please fill all required fields (*)', true);
    return false;
  }
  
  // Loading state dikhane ke liye
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.innerHTML;
  submitButton.disabled = true;
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> sending...';
  
  // Get form data
  const formData = {
    name: form.name.value,
    email: form.email.value,
    mobile: form.mobile.value,
    city: form.city.value,
    state: form.querySelector('select').value,
    pincode: form.pincode.value,
    installation_type: form.installation_type.value,
    capacity: form.capacity.value,
    area: form.area.value,
    avg_bill: form.avg_bill.value,
    description: form.description.value
  };

  try {
    // Google Apps Script web app URL jahan data submit hoga
    const webAppUrl = 'https://script.google.com/macros/s/AKfycbwpOI9wVWLL-I2dPw8dkjNh9YsPQmzbapuLYKL_LHJYGe55ECcTWYMpduZtE5NWnvdI/exec';
    
    // Loading animation ke liye minimum time (2 seconds)
    const minLoadingTime = 2000;
    const startTime = Date.now();
    
    // Form data ko server par bhejne ke liye fetch API use kiya gaya hai
    const response = await fetch(webAppUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    
    // Loading animation ko minimum time tak dikhane ke liye
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
    
    // Remaining time ka wait karo
    await new Promise(resolve => setTimeout(resolve, remainingTime));
    
    // Success message dikhao aur form ko reset karo
    showToast('Thank you! Your enquiry has been submitted.');
    form.reset();
    
  } catch (error) {
    console.error('Error:', error);
    showToast('Form submission failed. Please try again.', true);
  } finally {
    // Button ko wapas original state mein lao
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.innerHTML = 'Submit';
    }
  }
}

// The form submission is handled by the onsubmit attribute in the HTML

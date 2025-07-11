// contact.js - Interactivity for Contact Me section

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.contact-form');
  const successMsg = document.querySelector('.contact-success-message');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Simulate AJAX form submission (replace with real endpoint if needed)
      contactForm.reset();
      if (successMsg) {
        successMsg.style.display = 'block';
        setTimeout(() => {
          successMsg.style.display = 'none';
        }, 5000);
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('portfolio-contact-form');
  const feedbackMsg = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Show mock submission feedback
      feedbackMsg.textContent = 'Thank you! Your message has been sent successfully.';
      feedbackMsg.style.display = 'block';

      contactForm.reset();

      setTimeout(() => {
        feedbackMsg.style.display = 'none';
      }, 4000);
    });
  }
});
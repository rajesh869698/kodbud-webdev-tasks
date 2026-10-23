document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('application-form');
  const fullName = document.getElementById('fullname');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const message = document.getElementById('message');
  const charCounter = document.getElementById('char-counter');
  const successBanner = document.getElementById('success-banner');

  // Regex Patterns
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const PHONE_REGEX = /^[6-9]\d{9}$/; // 10-digit Indian standard / standard clean 10-digit format

  // Validation functions per field
  const validateFullName = () => {
    const val = fullName.value.trim();
    const isValid = val.length >= 3 && /^[a-zA-Z\s]+$/.test(val);
    toggleValidationState('group-fullname', isValid);
    return isValid;
  };

  const validateEmail = () => {
    const val = email.value.trim();
    const isValid = EMAIL_REGEX.test(val);
    toggleValidationState('group-email', isValid);
    return isValid;
  };

  const validatePhone = () => {
    // Strip hyphens, spaces, and country codes if typed (+91)
    const cleaned = phone.value.replace(/[\s-]/g, '').replace(/^(\+91)/, '');
    const isValid = PHONE_REGEX.test(cleaned);
    toggleValidationState('group-phone', isValid);
    return isValid;
  };

  const validateMessage = () => {
    const val = message.value.trim();
    charCounter.textContent = `${val.length} / 20 min`;
    const isValid = val.length >= 20;
    toggleValidationState('group-message', isValid);
    return isValid;
  };

  const toggleValidationState = (groupId, isValid) => {
    const group = document.getElementById(groupId);
    if (isValid) {
      group.classList.remove('invalid');
      group.classList.add('valid');
    } else {
      group.classList.remove('valid');
      group.classList.add('invalid');
    }
  };

  // Real-time input listeners
  fullName.addEventListener('input', validateFullName);
  fullName.addEventListener('blur', validateFullName);

  email.addEventListener('input', validateEmail);
  email.addEventListener('blur', validateEmail);

  phone.addEventListener('input', validatePhone);
  phone.addEventListener('blur', validatePhone);

  message.addEventListener('input', validateMessage);
  message.addEventListener('blur', validateMessage);

  // Form submission handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
      // Show success notification
      successBanner.classList.add('visible');

      // Reset form states
      form.reset();
      document.querySelectorAll('.form-group').forEach((group) => {
        group.classList.remove('valid', 'invalid');
      });
      charCounter.textContent = '0 / 20 min';

      // Auto-hide banner after 5 seconds
      setTimeout(() => {
        successBanner.classList.remove('visible');
      }, 5000);
    }
  });
});
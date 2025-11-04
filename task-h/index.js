// index.js
// Author: Nikolai Podkorytov
// Date: 2025-10-31 up
// Handles registration form validation and table row creation

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registrationForm');
  const tbody = document.getElementById('dataTable');

  const fields = {
    name: document.getElementById('fullName'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    birth: document.getElementById('birth'),
    terms: document.getElementById('terms')
  };

  const errors = {
    name: document.getElementById('errName'),
    email: document.getElementById('errEmail'),
    phone: document.getElementById('errPhone'),
    birth: document.getElementById('errBirth'),
    terms: document.getElementById('errTerms')
  };

  function clearErrors() {
    Object.values(errors).forEach(e => {
      e.textContent = '';
      e.classList.remove('opacity-100');
    });
  }

  function showError(field, message) {
    field.textContent = message;
    field.classList.add('opacity-100');
  }

  function validate() {
    clearErrors();
    let valid = true;

    // Full name
    const parts = fields.name.value.trim().split(/\s+/);
    if (parts.length < 2 || parts.some(p => p.length < 2)) {
      showError(errors.name, 'Please enter your full name (first and last, at least 2 letters each).');
      valid = false;
    }

    // Email
    const email = fields.email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError(errors.email, 'Please provide a valid email address.');
      valid = false;
    }

    // Phone
    const phone = fields.phone.value.replace(/\s+/g, '');
    if (!/^\+358\d{7,9}$/.test(phone)) {
      showError(errors.phone, 'Phone must start with +358 and contain 7–9 digits.');
      valid = false;
    }

    // Birth
    const birth = new Date(fields.birth.value);
    const today = new Date();
    if (isNaN(birth)) {
      showError(errors.birth, 'Please select your birth date.');
      valid = false;
    } else {
      const age = today.getFullYear() - birth.getFullYear() -
        (today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate()) ? 1 : 0);
      if (birth > today) {
        showError(errors.birth, 'Birth date cannot be in the future.');
        valid = false;
      } else if (age < 13) {
        showError(errors.birth, 'You must be at least 13 years old.');
        valid = false;
      }
    }

    // Terms
    if (!fields.terms.checked) {
      showError(errors.terms, 'You must accept the terms.');
      valid = false;
    }

    return valid;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) return;

    const timestamp = new Date().toLocaleString();
    document.getElementById('timestamp').value = timestamp;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${timestamp}</td>
      <td class="text-center">${fields.name.value.trim()}</td>
      <td class="text-center">${fields.email.value.trim()}</td>
      <td class="text-center">${fields.phone.value.trim()}</td>
      <td class="text-center">${fields.birth.value}</td>
      <td class="text-center">${fields.terms.checked ? 'Yes' : 'No'}</td>
    `;
    tbody.appendChild(row);

    form.reset();
  });
});

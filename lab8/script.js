function checkAnswer(buttonElement, isCorrect) {
  const resultText = buttonElement.parentElement.nextElementSibling;
  
  if (isCorrect) {
    resultText.textContent = 'Правильно! 👍';
    resultText.style.color = '#2e7d32';
  } else {
    resultText.textContent = 'Неверно, попробуйте ещё раз! ❌';
    resultText.style.color = '#c2185b';
  }
}

const regexRules = {
  fullname: /^[A-Za-zА-Яа-яЁё\s-]+$/,
  
  phone: /^\+?[0-9]{9,15}$/,
  
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
};

function validateField(inputElement, regex, errorElement) {
  if (!inputElement) return false;
  
  const value = inputElement.value.trim();
  const isValid = regex.test(value);

  if (isValid) {
    inputElement.classList.remove('invalid');
    inputElement.classList.add('valid');
    if (errorElement) errorElement.style.display = 'none';
  } else {
    inputElement.classList.remove('valid');
    inputElement.classList.add('invalid');
    if (errorElement) errorElement.style.display = 'block';
  }

  return isValid;
}


document.addEventListener('DOMContentLoaded', () => {

  const toggleButtons = document.querySelectorAll('.toggle-btn');
  
  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      
      toggleButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const contents = document.querySelectorAll('.tab-content');
      contents.forEach(content => content.classList.remove('active'));

      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  const form = document.getElementById('contactForm');
  const fullnameInput = document.getElementById('fullname');
  const phoneInput = document.getElementById('phone');
  const emailInput = document.getElementById('email');

  const fullnameError = document.getElementById('fullnameError');
  const phoneError = document.getElementById('phoneError');
  const emailError = document.getElementById('emailError');

  if (form) {
    if (fullnameInput) {
      fullnameInput.addEventListener('input', () => {
        validateField(fullnameInput, regexRules.fullname, fullnameError);
      });
    }

    if (phoneInput) {
      phoneInput.addEventListener('input', () => {
        validateField(phoneInput, regexRules.phone, phoneError);
      });
    }

    if (emailInput) {
      emailInput.addEventListener('input', () => {
        validateField(emailInput, regexRules.email, emailError);
      });
    }

    form.addEventListener('submit', (e) => {
      const isFullnameValid = validateField(fullnameInput, regexRules.fullname, fullnameError);
      const isPhoneValid = validateField(phoneInput, regexRules.phone, phoneError);
      const isEmailValid = validateField(emailInput, regexRules.email, emailError);

      if (!isFullnameValid || !isPhoneValid || !isEmailValid) {
        e.preventDefault(); 
        alert('Пожалуйста, заполни корректно все поля!');
      }
    });
  }
});
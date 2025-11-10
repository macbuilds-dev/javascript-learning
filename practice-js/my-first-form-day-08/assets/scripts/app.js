const form = document.getElementById('userForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPass = document.getElementById('confirmPass');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passError = document.getElementById('passError');
const confirmError = document.getElementById('confirmError');

function validateField(input, errorDiv, message) {
    if (!input.value.trim()) {
      errorDiv.textContent = message;
      input.style.borderColor = 'red';
      return false;
    } else {
      errorDiv.textContent = '';
      input.style.borderColor = 'green';
      return true;
    }
}

function validatePasswordMatch() {
    if (password.value !== confirmPass.value) {
      confirmError.textContent = 'Passwords do not match!';
      confirmPass.style.borderColor = 'red';
      return false;
    } else if (confirmPass.value) {
      confirmError.textContent = '';
      confirmPass.style.borderColor = 'green';
      return true;
    }
    return true;
}

fullName.addEventListener('input', () => validateField(
    fullName,
    nameError,
    'Full Name is required'
));
email.addEventListener('input', () => validateField(
    email, 
    emailError, 
    'Email is required'
));
password.addEventListener('input', () => {
    validateField(
        password, 
        passError, 
        'Password is required'
    );
    validatePasswordMatch();
});
confirmPass.addEventListener('input', () => {
    validateField(
        confirmPass, 
        confirmError, 
        'Please confirm password'
    );
    validatePasswordMatch();
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateField(fullName, nameError, 'Full Name is required');
    const isEmailValid = validateField(email, emailError, 'Email is required');
    const isPassValid = validateField(password, passError, 'Password is required');
    const isConfirmValid = validateField(confirmPass, confirmError, 'Please confirm password');
    const isMatch = validatePasswordMatch();

    if (isNameValid && isEmailValid && isPassValid && isConfirmValid && isMatch) {
      alert('Form submitted successfully!');
    }
});
// JavaScript for form validation and showing/hiding tasks
const form = document.getElementById('validation-form');
const task1Form = document.getElementById('task1-form');
const task2Container = document.getElementById('task2-container');


// Get all error message elements
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const techError = document.getElementById('tech-error');
const teamSizeError = document.getElementById('teamSize-error');


// Function to check for empty fields
function checkEmpty(field, errorElement) {
 if (field.value.trim() === '') {
 errorElement.textContent = 'This field is required.';
 return false;
 } else {
 errorElement.textContent = '';
 return true;
 }
}


// Function to validate email format
function validateEmail(emailField) {
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 if (!emailRegex.test(emailField.value)) {
 emailError.textContent = 'Invalid email format.';
 return false;
 } else {
 emailError.textContent = '';
 return true;
 }
}


// Function to validate password strength
function validatePassword(passwordField) {
 if (passwordField.value.length < 8) {
 passwordError.textContent = 'Password must be at least 8 characters long.';
 return false;
 } else {
 passwordError.textContent = '';
 return true;
 }
}


// Function to validate checkbox group
function validateTechCheckboxes() {
 const checkboxes = document.querySelectorAll('input[name="tech"]:checked');
 if (checkboxes.length < 3) {
 techError.textContent = 'Please select at least 3 technologies/skills.';
 return false;
 } else {
 techError.textContent = '';
 return true;
 }
}


function validateTeamSize() {
 const teamSizeSelect = document.getElementById('teamSize');
 if (teamSizeSelect.value === "") {
 teamSizeError.textContent = "Please select a team size";
 return false;
 }
 else {
 teamSizeError.textContent = "";
 return true;
 }
}


// Main form validation function
form.addEventListener('submit', function(event) {
 event.preventDefault(); // Prevent default form submission


 const isNameValid = checkEmpty(document.getElementById('name'), nameError);
 const isEmailValid = checkEmpty(document.getElementById('email'), emailError) && validateEmail(document.getElementById('email'));
 const isPasswordValid = checkEmpty(document.getElementById('password'), passwordError) && validatePassword(document.getElementById('password'));
 const isTechValid = validateTechCheckboxes();
 const isTeamSizeValid = validateTeamSize();


 if (isNameValid && isEmailValid && isPasswordValid && isTechValid && isTeamSizeValid) {
 // If all validations pass, hide Task 1 and show Task 2
 task1Form.style.display = 'none';
 task2Container.style.display = 'block';
 //  Here you would dynamically insert the content of Task 2
 //  task2Container.innerHTML = "<h2>Task 2: ...</h2><p>...</p>";
 }
});
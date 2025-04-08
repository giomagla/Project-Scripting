// Function to validate the form (replace with your actual validation logic)
function validateForm() {
    let isValid = true;
    //  Example: Check if first name is empty
    const firstName = document.getElementById('first-name').value;
    if (firstName.trim() === '') {
    isValid = false;
    document.getElementById('first-name-error').textContent = 'First name is required';
    } else {
    document.getElementById('first-name-error').textContent = ''; // Clear error
    }
    return isValid;
   }
   
   
   //  Get references to the form and the dice game container
   const formContainer = document.getElementById('task1-form');
   const diceGameContainer = document.getElementById('dice-game-container');
   const form = document.getElementById('validation-form');
   
   
   //  Add an event listener to the form's submit button
   form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission (page refresh)
   
   
    if (validateForm()) {
    //  If the form is valid:
    formContainer.style.display = 'none'; // Hide the form
    diceGameContainer.style.display = 'block'; // Show the dice game
    } else {
    //  If the form is invalid:
    //  Your validation function should display error messages
    }
   });
document.addEventListener("DOMContentLoaded", function () {
  // Grab the form element from the DOM
  const form = document.querySelector("form");

  // Get individual input elements by their IDs
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  // Select all checkboxes with the name "technologies"
  const technologiesCheckboxes = document.querySelectorAll(
    'input[name="technologies"]'
  );

  // Prevent browser's native email validation tooltip from interfering
  emailInput.addEventListener("input", function () {
    emailInput.setCustomValidity(""); // Reset custom validation error if any
  });

  // Listen for form submission event
  form.addEventListener("submit", function (event) {
    let isValid = true; // Flag to track overall form validity

    // Clear any previous error messages and reset styles
    clearErrors();

    // Check if first name field is empty
    if (!firstNameInput.value.trim()) {
      showError(firstNameInput, "First name is required.");
      isValid = false;
    }

    // Check if last name field is empty
    if (!lastNameInput.value.trim()) {
      showError(lastNameInput, "Last name is required.");
      isValid = false;
    }

    // Check if email field is empty
    if (!emailInput.value.trim()) {
      showError(emailInput, "Email is required.");
      isValid = false;
    }

    // Check if password field is empty
    if (!passwordInput.value.trim()) {
      showError(passwordInput, "Password is required.");
      isValid = false;
    }

    // Validate email format using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() && !emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, "Please enter a valid email address.");
      isValid = false;
    }

    // Ensure password is at least 8 characters long
    if (passwordInput.value.trim() && passwordInput.value.length < 8) {
      showError(passwordInput, "Password must be at least 8 characters long.");
      isValid = false;
    }

    // Count how many technology checkboxes are checked
    let checkedCount = 0;
    technologiesCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        checkedCount++;
      }
    });

    // Require at least 3 technologies to be selected
    if (checkedCount < 3) {
      showError(
        document.querySelector(".technologies"),
        "⚠︎ choose at least 3 services."
      );
      isValid = false;
    }

    // If any validation fails, prevent form submission
    if (!isValid) {
      event.preventDefault();
    }
  });

  /**
   * Displays an error message next to the specified input element
   * @param {HTMLElement} inputElement - The form input element with the error
   * @param {string} errorMessage - The message to display
   */
  function showError(inputElement, errorMessage) {
    const errorSpan = document.createElement("span");
    errorSpan.className = "error-message";
    errorSpan.textContent = errorMessage;

    // Append the error message to the input's parent
    inputElement.parentNode.appendChild(errorSpan);

    // Apply visual error styling
    inputElement.classList.add("error");
  }

  /**
   * Clears all existing error messages and resets input styles
   */
  function clearErrors() {
    // Remove all error messages from the DOM
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((message) => message.remove());

    // Reset error class and border color on inputs and selects
    const inputs = document.querySelectorAll("input, select");
    inputs.forEach((input) => {
      input.style.borderColor = "";
      input.classList.remove("error");
    });
  }
});

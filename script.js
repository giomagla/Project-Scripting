// Wait until the HTML content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  // Get all form input elements
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  // Get all checkboxes for technology selection
  const technologiesCheckboxes = document.querySelectorAll(
    'input[name="technologies"]'
  );

  // Clear browser email validation warning on input
  emailInput.addEventListener("input", function () {
    emailInput.setCustomValidity("");
  });

  // When form is submitted
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Stop form from refreshing the page

    let isValid = true;
    clearErrors(); // Clear previous validation messages

    // Validate each field
    if (!firstNameInput.value.trim()) {
      showError(firstNameInput, "First name is required.");
      isValid = false;
    }

    if (!lastNameInput.value.trim()) {
      showError(lastNameInput, "Last name is required.");
      isValid = false;
    }

    if (!emailInput.value.trim()) {
      showError(emailInput, "Email is required.");
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() && !emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, "Please enter a valid email address.");
      isValid = false;
    }

    if (!passwordInput.value.trim()) {
      showError(passwordInput, "Password is required.");
      isValid = false;
    } else if (passwordInput.value.length < 8) {
      showError(passwordInput, "Password must be at least 8 characters long.");
      isValid = false;
    }

    // Count how many services are checked
    let checkedCount = 0;
    technologiesCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        checkedCount++;
      }
    });

    if (checkedCount < 3) {
      showError(
        document.querySelector(".technologies"),
        "⚠︎ choose at least 3 services."
      );
      isValid = false;
    }

    // If form is valid, show the dice game
    if (isValid) {
      form.style.display = "none"; // Hide form

      const diceContainer = document.getElementById("dice-container");

      // Load dice page content
      fetch("dice-page.html")
        .then((res) => res.text())
        .then((html) => {
          diceContainer.innerHTML = html;
          diceContainer.style.display = "block";

          // Dynamically add dice logic script
          const diceScript = document.createElement("script");
          diceScript.src = "dice-script.js";
          document.body.appendChild(diceScript);
        })
        .catch((err) => {
          diceContainer.innerHTML = "<p>Could not load the game.</p>";
          console.error("Error loading dice page:", err);
        });
    }
  });

  // Show error message for invalid fields
  function showError(inputElement, errorMessage) {
    const errorSpan = document.createElement("span");
    errorSpan.className = "error-message";
    errorSpan.textContent = errorMessage;

    inputElement.parentNode.appendChild(errorSpan);
    inputElement.classList.add("error");
  }

  // Remove all previous error messages and styling
  function clearErrors() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((message) => message.remove());

    const inputs = document.querySelectorAll("input, select");
    inputs.forEach((input) => {
      input.style.borderColor = "";
      input.classList.remove("error");
    });
  }
});

// Game variables
let player1TotalScore = 0;
let player2TotalScore = 0;
let round = 0;
const history = [];

// Function to roll the dice
function rollDice() {
  let diceImages = document.getElementById("diceImages");
  let player1Message = document.getElementById("player1Message");
  let player2Message = document.getElementById("player2Message");
  let victoryMessage = document.getElementById("victoryMessage");
  let historyScores = document.getElementById("historyScores");

  // Generate random dice results (1 to 6)
  const player1Result = Math.floor(Math.random() * 6) + 1;
  const player2Result = Math.floor(Math.random() * 6) + 1;

  // Update total scores
  player1TotalScore += player1Result;
  player2TotalScore += player2Result;

  // Show player scores
  player1Message.innerHTML = `PLAYER 1 SCORE: <span class="score">${player1TotalScore}</span>`;
  player2Message.innerHTML = `PLAYER 2 SCORE: <span class="score">${player2TotalScore}</span>`;

  // Display dice images
  diceImages.innerHTML = `
    <img src="Dice/${player1Result}.png" alt="Dice 1">
    <span class="vs">vs</span>
    <img src="Dice/${player2Result}.png" alt="Dice 2">
  `;

  // Check who won or if it's a draw
  const resultMessage = diceResults(player1Result, player2Result);

  // Add emoji to title message
  const titleMessage = resultMessage.includes("won")
    ? resultMessage + " 🎉"
    : resultMessage + " 🤝";
  victoryMessage.textContent = titleMessage;

  round++; // Increase round number

  // Create the history message with appropriate emoji
  const historyMessage = resultMessage.includes("won")
    ? `• Round ${round}: Player 1 rolled ${player1Result}, Player 2 rolled ${player2Result} -> 🏆 ${resultMessage.replace("won!", "wins ").replace("🎉","")}`
    : `• Round ${round}: Player 1 rolled ${player1Result}, Player 2 rolled ${player2Result} -> 🤝 ${resultMessage}`;

  // Add to history array and display in UI
  history.push(historyMessage);

  const entry = document.createElement("div");
  entry.textContent = historyMessage;
  historyScores.appendChild(entry);
}

// Decide who wins based on dice roll
function diceResults(player1Result, player2result) {
  if (player1Result > player2result) {
    player1TotalScore = 0;
    player2TotalScore = 0;
    return "Player 1 won!";
  } else if (player1Result < player2result) {
    player1TotalScore = 0;
    player2TotalScore = 0;
    return "Player 2 won!";
  } else {
    return "It's a Draw! ";
  }
}

// Reset the game state
function resetGame() {
  player1TotalScore = 0;
  player2TotalScore = 0;
  round = 0;
  history.length = 0;

  document.getElementById("player1Message").innerHTML =
    'PLAYER 1 SCORE: <span class="score">0</span>';
  document.getElementById("player2Message").innerHTML =
    'PLAYER 2 SCORE: <span class="score">0</span>';
  document.getElementById("victoryMessage").textContent = "Let's see who wins!";
  document.getElementById("diceImages").innerHTML = `
    <img src="Dice/1.png" alt="Player 1 Dice">
    <span class="vs">vs</span>
    <img src="Dice/1.png" alt="Player 2 Dice">
  `;
  document.getElementById("historyScores").innerHTML = "";
}

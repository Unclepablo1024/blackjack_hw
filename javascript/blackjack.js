// === Global Data Model ===
let bankroll = 2022;

// === Utility Functions ===

/**
 * Gets the current bankroll value.
 * @returns {number} The player's current bankroll.
 */
function getBankroll() {
  return bankroll;
}

/**
 * Sets the bankroll to a new integer value.
 * @param {number} newBalance - The updated bankroll amount.
 */
function setBankroll(newBalance) {
  bankroll = parseInt(newBalance, 10);
  updateBankrollDisplay();
}

/**
 * Updates the bankroll display UI.
 */
function updateBankrollDisplay() {
  const display = document.getElementById("bankrollDisplay");
  if (display) {
    display.textContent = `$${bankroll}`;
  }
}

// === UI Control Functions ===

/**
 * Transitions the UI to betting mode.
 */
function timeToBet() {
  hideSection("playersActions");
  showSection("betting");
  updateBankrollDisplay();
}

/**
 * Transitions the UI to gameplay mode.
 */
function timeToPlay() {
  hideSection("betting");
  showSection("playersActions");
}

/**
 * Helper to hide a section by ID.
 * @param {string} id
 */
function hideSection(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add("hidden");
}

/**
 * Helper to show a section by ID.
 * @param {string} id
 */
function showSection(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove("hidden");
}

// === Game Interaction ===

/**
 * Processes the player's wager input.
 */
function makeWager() {
  const wagerInput = document.getElementById("users-wager");
  const wager = parseInt(wagerInput.value, 10);

  if (isNaN(wager) || wager <= 0) {
    console.warn("Invalid wager. Please enter a positive number.");
    alert("Please enter a valid wager greater than $0.");
    return;
  }

  if (wager > bankroll) {
    console.warn("Wager exceeds bankroll.");
    alert("You cannot bet more than your bankroll.");
    return;
  }

  console.log(`User wagered: $${wager}`);

  // Optional: Deduct the wager from the bankroll
  // setBankroll(getBankroll() - wager);

  timeToPlay();
}

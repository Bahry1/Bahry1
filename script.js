const sunCoin = document.getElementById("sun-coin");
const scoreDisplay = document.getElementById("current-score");
const energyBar = document.getElementById("energy-bar-fill");
const energyValueDisplay = document.getElementById("energy-value");
const dailyEnergyBar = document.getElementById("daily-energy-bar-fill");
const currentCupDisplay = document.getElementById("current-cup");

const dailyButton = document.getElementById("daily-button");
const dailyPopup = document.getElementById("daily-popup");
const dailyTimer = document.getElementById("daily-timer");

const cupButton = document.getElementById("cup-details-button");
const cupPopup = document.getElementById("cup-popup");

let score = 0;
let energy = 50;
let clickCount = 0;

const energyMax = 50;
const resetKey = 'lastEnergyReset';
const energyKey = 'currentEnergy';
const clickKey = 'clickCount';
const scoreKey = 'userScore';

// Load saved data
function loadGame() {
  const savedEnergy = parseFloat(localStorage.getItem(energyKey));
  const lastReset = parseInt(localStorage.getItem(resetKey));
  const savedClicks = parseInt(localStorage.getItem(clickKey));
  const savedScore = parseInt(localStorage.getItem(scoreKey));
  const now = Date.now();

  score = isNaN(savedScore) ? 0 : savedScore;

  if (!lastReset || now - lastReset > 86400000) {
    energy = energyMax;
    clickCount = 0;
    localStorage.setItem(resetKey, now.toString());
  } else {
    energy = isNaN(savedEnergy) ? energyMax : savedEnergy;
    clickCount = isNaN(savedClicks) ? 0 : savedClicks;
  }

  updateScore();
  updateEnergyBar();
  updateCup();
  updateEnergyValue();
}

// Update score display
function updateScore() {
  scoreDisplay.textContent = score;
}

// Update energy bar width
function updateEnergyBar() {
  const percent = Math.max(0, Math.min((energy / energyMax) * 100, 100));
  energyBar.style.width = `${percent}%`;
  if (dailyEnergyBar) {
    dailyEnergyBar.style.width = `${percent}%`;
  }
}

// Show energy value
function updateEnergyValue() {
  energyValueDisplay.textContent = energy.toFixed(2);
}

// Update cup title based on score
function updateCup() {
  if (score >= 76) currentCupDisplay.textContent = "Legendary League";
  else if (score >= 61) currentCupDisplay.textContent = "Diamond League";
  else if (score >= 51) currentCupDisplay.textContent = "Ruby League";
  else if (score >= 41) currentCupDisplay.textContent = "Sapphire League";
  else if (score >= 31) currentCupDisplay.textContent = "Emerald League";
  else if (score >= 21) currentCupDisplay.textContent = "Gold League";
  else if (score >= 11) currentCupDisplay.textContent = "Silver League";
  else currentCupDisplay.textContent = "Bronze League";
}

// Save to localStorage
function saveGame() {
  localStorage.setItem(energyKey, energy.toString());
  localStorage.setItem(clickKey, clickCount.toString());
  localStorage.setItem(scoreKey, score.toString());
}

// On coin click
sunCoin.addEventListener("click", () => {
  const cost = (clickCount + 1) * 0.01;
  if (energy < cost) return;

  sunCoin.classList.add("coin-tap-animation");

  score++;
  energy -= cost;
  clickCount++;

  updateScore();
  updateEnergyBar();
  updateEnergyValue();
  updateCup();
  saveGame();

  setTimeout(() => {
    sunCoin.classList.remove("coin-tap-animation");
  }, 150);
});

// Daily popup toggle
dailyButton.addEventListener("click", () => {
  dailyPopup.classList.remove("hidden");
});

// Cup popup toggle
cupButton.addEventListener("click", () => {
  cupPopup.classList.remove("hidden");
});

// Daily energy timer
setInterval(() => {
  const lastReset = parseInt(localStorage.getItem(resetKey));
  const now = Date.now();
  const timeLeft = 86400000 - (now - lastReset);

  if (timeLeft <= 0) {
    dailyTimer.textContent = "Energy is full!";
  } else {
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    dailyTimer.textContent = `Energy refreshes in: ${hours}h ${minutes}m ${seconds}s`;
  }
}, 1000);

// Init
loadGame();

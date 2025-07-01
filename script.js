const sunCoin = document.getElementById("sun-coin");
const scoreDisplay = document.getElementById("current-score");
const energyBar = document.getElementById("energy-bar-fill");

const dailyButton = document.getElementById("daily-button");
const dailyPopup = document.getElementById("daily-popup");
const dailyTimer = document.getElementById("daily-timer");

const cupButton = document.getElementById("cup-details-button");
const cupPopup = document.getElementById("cup-popup");

let score = 0;
let energy = 50;
const energyMax = 50;
const energyPerClick = 0.01;
const resetKey = 'lastEnergyReset';
const energyKey = 'currentEnergy';

// Load energy and reset logic
function loadEnergy() {
  const savedEnergy = parseFloat(localStorage.getItem(energyKey));
  const lastReset = parseInt(localStorage.getItem(resetKey));
  const now = Date.now();

  if (!lastReset || now - lastReset > 24 * 60 * 60 * 1000) {
    energy = energyMax;
    localStorage.setItem(resetKey, now.toString());
  } else {
    energy = isNaN(savedEnergy) ? energyMax : savedEnergy;
  }

  updateEnergyBar();
}

function updateEnergyBar() {
  const percent = Math.max(0, Math.min((energy / energyMax) * 100, 100));
  energyBar.style.width = `${percent}%`;
}

function saveEnergy() {
  localStorage.setItem(energyKey, energy.toString());
}

sunCoin.addEventListener("click", () => {
  if (energy <= 0) return;

  sunCoin.classList.add("coin-tap-animation");

  score++;
  scoreDisplay.textContent = score;

  energy -= energyPerClick;
  if (energy < 0) energy = 0;

  updateEnergyBar();
  saveEnergy();

  setTimeout(() => {
    sunCoin.classList.remove("coin-tap-animation");
  }, 150);
});

// Daily timer popup
dailyButton.addEventListener("click", () => {
  dailyPopup.classList.toggle("hidden");
});

// Cup popup
cupButton.addEventListener("click", () => {
  cupPopup.classList.toggle("hidden");
});

// Countdown updater
setInterval(() => {
  const lastReset = parseInt(localStorage.getItem(resetKey));
  const now = Date.now();
  let timeLeft = 24 * 60 * 60 * 1000 - (now - lastReset);

  if (timeLeft <= 0) {
    dailyTimer.textContent = "Energy is full!";
  } else {
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    dailyTimer.textContent = `Energy refreshes in: ${hours}h ${minutes}m ${seconds}s`;
  }
}, 1000);

// Initial setup
loadEnergy();

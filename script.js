const sunCoin = document.getElementById("sun-coin");
const scoreDisplay = document.getElementById("current-score");
const energyBar = document.getElementById("energy-bar-fill");
const energyValueDisplay = document.getElementById("energy-value");

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

// Load energy and click state from localStorage
function loadEnergy() {
  const savedEnergy = parseFloat(localStorage.getItem(energyKey));
  const lastReset = parseInt(localStorage.getItem(resetKey));
  const savedClicks = parseInt(localStorage.getItem(clickKey));
  const now = Date.now();

  if (!lastReset || now - lastReset > 86400000) {
    energy = energyMax;
    clickCount = 0;
    localStorage.setItem(resetKey, now.toString());
  } else {
    energy = isNaN(savedEnergy) ? energyMax : savedEnergy;
    clickCount = isNaN(savedClicks) ? 0 : savedClicks;
  }

  updateEnergyBar();
  updateEnergyValue();
}

function updateEnergyBar() {
  const percent = Math.max(0, Math.min((energy / energyMax) * 100, 100));
  energyBar.style.width = `${percent}%`;
}

function updateEnergyValue() {
  energyValueDisplay.textContent = energy.toFixed(2);
}

function saveState() {
  localStorage.setItem(energyKey, energy.toString());
  localStorage.setItem(clickKey, clickCount.toString());
}

sunCoin.addEventListener("click", () => {
  const cost = (clickCount + 1) * 0.01;
  if (energy < cost) return;

  sunCoin.classList.add("coin-tap-animation");

  score++;
  clickCount++;
  energy -= cost;

  scoreDisplay.textContent = score;
  updateEnergyBar();
  updateEnergyValue();
  saveState();

  setTimeout(() => {
    sunCoin.classList.remove("coin-tap-animation");
  }, 150);
});

// DAILY popup toggle
dailyButton.addEventListener("click", () => {
  dailyPopup.classList.remove("hidden");
});

// CUP popup toggle
cupButton.addEventListener("click", () => {
  cupPopup.classList.remove("hidden");
});

// DAILY timer countdown
setInterval(() => {
  const lastReset = parseInt(localStorage.getItem(resetKey));
  const now = Date.now();
  let timeLeft = 86400000 - (now - lastReset);

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

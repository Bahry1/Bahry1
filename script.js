const sunCoin = document.getElementById("sun-coin");
const scoreDisplay = document.getElementById("current-score");
const energyBar = document.getElementById("energy-bar-fill");
const energyValueDisplay = document.getElementById("energy-value");
const dailyEnergyBar = document.getElementById("daily-energy-bar-fill");
const totalScoreDisplay = document.getElementById("total-score");
const currentCupDisplay = document.getElementById("current-cup");
const dailyButton = document.getElementById("daily-button");
const dailyPopup = document.getElementById("daily-popup");
const dailyTimer = document.getElementById("daily-timer");
const cupButton = document.getElementById("cup-details-button");
const cupPopup = document.getElementById("cup-popup");
const cupSlider = document.getElementById("cup-slider");

let score = 0;
let totalScore = 0;
let energy = 50;
let clickCount = 0;
let lastReset = Date.now();

const cupLeagues = [
  { name: "Bronze", image: "bronze-cup.png", required: 0 },
  { name: "Silver", image: "silver-cup.png", required: 60 },
  { name: "Gold", image: "gold-cup.png", required: 80 },
  { name: "Emerald", image: "emerald-cup.png", required: 110 },
  { name: "Sapphire", image: "sapphire-cup.png", required: 140 },
  { name: "Ruby", image: "ruby-cup.png", required: 180 },
  { name: "Diamond", image: "diamond-cup.png", required: 220 },
  { name: "Legendary", image: "legendary-cup.png", required: 270 }
];

function getCurrentCup(score) {
  for (let i = cupLeagues.length - 1; i >= 0; i--) {
    if (score >= cupLeagues[i].required) {
      return cupLeagues[i].name + " League";
    }
  }
  return "Bronze League";
}

function updateScore() {
  scoreDisplay.textContent = score;
}

function updateTotalScoreDisplay() {
  totalScoreDisplay.textContent = totalScore;
}

function updateEnergyBar() {
  const percent = Math.max(0, Math.min((energy / 50) * 100, 100));
  energyBar.style.width = `${percent}%`;
  dailyEnergyBar.style.width = `${percent}%`;
}

function updateEnergyValue() {
  energyValueDisplay.textContent = energy.toFixed(2);
}

function updateCup() {
  currentCupDisplay.textContent = getCurrentCup(totalScore);
  renderCupSlider();
}

function renderCupSlider() {
  cupSlider.innerHTML = "";

  cupLeagues.forEach((cup, i) => {
    const cupImg = document.createElement("img");
    cupImg.src = `images/cups/${cup.image}`;
    cupImg.alt = `${cup.name} Cup`;
    cupImg.className = "league-cup";

    const nextLeague = cupLeagues[i + 1];
    const maxScore = nextLeague ? nextLeague.required - 1 : Infinity;

    if (totalScore >= cup.required && totalScore <= maxScore) {
      cupImg.classList.add("active");
    }

    // Error handling for broken image
    cupImg.onerror = () => {
      console.error(`Failed to load image: ${cupImg.src}`);
    };

    cupSlider.appendChild(cupImg);
  });
}

sunCoin.addEventListener("click", () => {
  const cost = 0.01;
  if (energy < cost) return;

  sunCoin.classList.add("coin-tap-animation");

  score++;
  totalScore++;
  energy -= cost;
  clickCount++;

  updateScore();
  updateTotalScoreDisplay();
  updateEnergyBar();
  updateEnergyValue();
  updateCup();

  setTimeout(() => {
    sunCoin.classList.remove("coin-tap-animation");
  }, 150);
});

dailyButton.addEventListener("click", () => {
  dailyPopup.classList.remove("hidden");
});

cupButton.addEventListener("click", () => {
  cupPopup.classList.remove("hidden");
});

setInterval(() => {
  const now = Date.now();
  const timeLeft = 86400000 - (now - lastReset);

  if (timeLeft <= 0) {
    energy = 50;
    clickCount = 0;
    score = 0;
    lastReset = now;
    updateScore();
    updateEnergyBar();
    updateEnergyValue();
    updateCup();
  }

  if (timeLeft <= 0) {
    dailyTimer.textContent = "Energy is full!";
  } else {
    const hours = Math.floor(timeLeft / 3600000);
    const minutes = Math.floor((timeLeft % 3600000) / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);
    dailyTimer.textContent = `Energy refreshes in: ${hours}h ${minutes}m ${seconds}s`;
  }
}, 1000);

// Run initial setup after DOM loaded
window.addEventListener("DOMContentLoaded", () => {
  updateScore();
  updateTotalScoreDisplay();
  updateEnergyBar();
  updateEnergyValue();
  updateCup();
});

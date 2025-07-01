document.addEventListener("DOMContentLoaded", () => {
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
  const closeDailyBtn = document.getElementById("close-daily");

  const cupButton = document.getElementById("cup-details-button");
  const cupPopup = document.getElementById("cup-popup");
  const closeCupBtn = document.getElementById("close-cup");

  let score = 0;
  let totalScore = 0;
  let energy = 50;
  let clickCount = 0;
  let lastReset = Date.now();

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
    if (totalScore >= 76) currentCupDisplay.textContent = "Legendary League";
    else if (totalScore >= 61) currentCupDisplay.textContent = "Diamond League";
    else if (totalScore >= 51) currentCupDisplay.textContent = "Ruby League";
    else if (totalScore >= 41) currentCupDisplay.textContent = "Sapphire League";
    else if (totalScore >= 31) currentCupDisplay.textContent = "Emerald League";
    else if (totalScore >= 21) currentCupDisplay.textContent = "Gold League";
    else if (totalScore >= 11) currentCupDisplay.textContent = "Silver League";
    else currentCupDisplay.textContent = "Bronze League";
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

  closeDailyBtn.addEventListener("click", () => {
    dailyPopup.classList.add("hidden");
  });

  closeCupBtn.addEventListener("click", () => {
    cupPopup.classList.add("hidden");
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

  updateScore();
  updateTotalScoreDisplay();
  updateEnergyBar();
  updateEnergyValue();
  updateCup();
});

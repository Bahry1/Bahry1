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
  const cupSlider = document.getElementById("cup-slider");
  const popupLeagueName = document.getElementById("popup-league-name");
  const popupLeagueRange = document.getElementById("popup-league-range");
  const popupLeagueScore = document.getElementById("popup-league-score");

  let score = 0;
  let totalScore = 0;
  let energy = 50;
  let lastReset = Date.now();

  const leagues = [
    { name: "Bronze", required: 0, class: "bronze", description: "0–10 SUN", color: "#4e3b24" },
    { name: "Silver", required: 11, class: "silver", description: "11–20 SUN", color: "#777" },
    { name: "Gold", required: 21, class: "gold", description: "21–30 SUN", color: "#bfa039" },
    { name: "Emerald", required: 31, class: "emerald", description: "31–40 SUN", color: "#115a42" },
    { name: "Sapphire", required: 41, class: "sapphire", description: "41–50 SUN", color: "#0e2a66" },
    { name: "Ruby", required: 51, class: "ruby", description: "51–60 SUN", color: "#75002b" },
    { name: "Diamond", required: 61, class: "diamond", description: "61–75 SUN", color: "#37577f" },
    { name: "Legendary", required: 76, class: "legendary", description: "76+ SUN", color: "#222" }
  ];

  function getCurrentLeague(score) {
    return leagues.slice().reverse().find(l => score >= l.required) || leagues[0];
  }

  function renderCupSlider(activeLeagueName) {
    cupSlider.innerHTML = "";
    leagues.forEach((cup) => {
      const card = document.createElement("div");
      card.className = `cup-card ${cup.class}`;
      if (cup.name === activeLeagueName) card.classList.add("active");

      const img = document.createElement("img");
      img.src = `images/cups/${cup.name.toLowerCase()}-cup.png`;
      img.alt = `${cup.name} Cup`;

      const name = document.createElement("div");
      name.className = "cup-name";
      name.textContent = `${cup.name} League`;

      const description = document.createElement("div");
      description.className = "cup-description";
      description.textContent = `Required: ${cup.description}`;

      const progress = document.createElement("div");
      progress.className = "cup-score";
      progress.textContent = `Your Score: ${totalScore}`;

      card.appendChild(img);
      card.appendChild(name);
      card.appendChild(description);
      card.appendChild(progress);
      cupSlider.appendChild(card);
    });
  }

  function updateCupDisplay() {
    const current = getCurrentLeague(totalScore);
    currentCupDisplay.textContent = `${current.name} League`;

    popupLeagueName.textContent = `${current.name} League`;
    popupLeagueRange.textContent = `Required: ${current.description}`;
    popupLeagueScore.textContent = `Your Score: ${totalScore}`;
    cupPopup.style.backgroundColor = current.color;

    renderCupSlider(current.name);
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

  function updateAll() {
    updateScore();
    updateTotalScoreDisplay();
    updateEnergyBar();
    updateEnergyValue();
    updateCupDisplay();
  }

  sunCoin.addEventListener("click", () => {
    const cost = 0.01;
    if (energy < cost) return;

    sunCoin.classList.add("coin-tap-animation");
    score++;
    totalScore++;
    energy -= cost;
    updateAll();

    setTimeout(() => {
      sunCoin.classList.remove("coin-tap-animation");
    }, 150);
  });

  dailyButton.addEventListener("click", () => {
    dailyPopup.classList.remove("hidden");
  });

  closeDailyBtn.addEventListener("click", () => {
    dailyPopup.classList.add("hidden");
  });

  cupButton.addEventListener("click", () => {
    cupPopup.classList.remove("hidden");
  });

  closeCupBtn.addEventListener("click", () => {
    cupPopup.classList.add("hidden");
  });

  // تایمر برای ریست انرژی
  setInterval(() => {
    const now = Date.now();
    const timeLeft = 86400000 - (now - lastReset);

    if (timeLeft <= 0) {
      energy = 50;
      score = 0;
      lastReset = now;
      updateAll();
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

  updateAll();
});

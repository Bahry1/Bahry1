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

  let score = 0;
  let totalScore = 0;
  let energy = 50;
  let lastReset = Date.now();

  const leagues = [
    { name: "Bronze", required: 0, image: "bronze-cup.png", description: "0 to 10 SUN", background: "#2d2d2d" },
    { name: "Silver", required: 11, image: "silver-cup.png", description: "11 to 20 SUN", background: "#555" },
    { name: "Gold", required: 21, image: "gold-cup.png", description: "21 to 30 SUN", background: "#664400" },
    { name: "Emerald", required: 31, image: "emerald-cup.png", description: "31 to 40 SUN", background: "#0f4d4d" },
    { name: "Sapphire", required: 41, image: "sapphire-cup.png", description: "41 to 50 SUN", background: "#001f3f" },
    { name: "Ruby", required: 51, image: "ruby-cup.png", description: "51 to 60 SUN", background: "#660033" },
    { name: "Diamond", required: 61, image: "diamond-cup.png", description: "61 to 75 SUN", background: "#223344" },
    { name: "Legendary", required: 76, image: "legendary-cup.png", description: "76+ SUN", background: "#000000" }
  ];

  function getCurrentLeague(score) {
    return leagues.slice().reverse().find(l => score >= l.required) || leagues[0];
  }

  function updateCupDisplay() {
    const current = getCurrentLeague(totalScore);
    currentCupDisplay.textContent = `${current.name} League`;
    cupPopup.style.background = current.background;
    renderCupSlider(current.name);
  }

  function renderCupSlider(activeLeagueName) {
    cupSlider.innerHTML = "";
    leagues.forEach((cup) => {
      const card = document.createElement("div");
      card.className = "cup-card";
      if (cup.name === activeLeagueName) card.classList.add("active");

      const img = document.createElement("img");
      img.src = `images/cups/${cup.image}`;
      img.alt = `${cup.name} Cup`;

      const caption = document.createElement("div");
      caption.className = "cup-info-text";
      caption.textContent = `${cup.name} – ${cup.description}`;

      card.appendChild(img);
      card.appendChild(caption);
      cupSlider.appendChild(card);
    });
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

  sunCoin.addEventListener("click", (event) => {
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

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
    { name: "Bronze", required: 0, image: "bronze-cup.png", description: "0 to 10 SUN" },
    { name: "Silver", required: 11, image: "silver-cup.png", description: "11 to 20 SUN" },
    { name: "Gold", required: 21, image: "gold-cup.png", description: "21 to 30 SUN" },
    { name: "Emerald", required: 31, image: "emerald-cup.png", description: "31 to 40 SUN" },
    { name: "Sapphire", required: 41, image: "sapphire-cup.png", description: "41 to 50 SUN" },
    { name: "Ruby", required: 51, image: "ruby-cup.png", description: "51 to 60 SUN" },
    { name: "Diamond", required: 61, image: "diamond-cup.png", description: "61 to 75 SUN" },
    { name: "Legendary", required: 76, image: "legendary-cup.png", description: "76+ SUN" }
  ];

  function createTapPulse(x, y) {
    const pulse = document.createElement("div");
    pulse.className = "tap-pulse";
    pulse.style.left = x + "px";
    pulse.style.top = y + "px";
    document.body.appendChild(pulse);
    setTimeout(() => pulse.remove(), 500);
  }

  function getCurrentLeague(score) {
    return leagues.slice().reverse().find(l => score >= l.required) || leagues[0];
  }

  function updateCupDisplay() {
    const current = getCurrentLeague(totalScore);
    currentCupDisplay.textContent = `${current.name} League`;
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

  sunCoin.addEventListener("click", (event) => {
    if (energy < 0.01) return;
    sunCoin.classList.add("coin-tap-animation");
    createTapPulse(event.clientX, event.clientY);
    score++;
    totalScore++;
    energy -= 0.01;
    updateAll();
    setTimeout(() => sunCoin.classList.remove("coin-tap-animation"), 150);
  });

  function updateAll() {
    scoreDisplay.textContent = score;
    totalScoreDisplay.textContent = totalScore;
    energyBar.style.width = `${(energy / 50) * 100}%`;
    dailyEnergyBar.style.width = `${(energy / 50) * 100}%`;
    energyValueDisplay.textContent = energy.toFixed(2);
    updateCupDisplay();
  }

  dailyButton.addEventListener("click", () => dailyPopup.classList.remove("hidden"));
 

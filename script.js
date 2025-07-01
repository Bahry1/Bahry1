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
  const cupButton = document.getElementById("cup-details-button");
  const cupPopup = document.getElementById("cup-popup");
  const cupSlider = document.getElementById("cup-slider");
  const closeDailyBtn = document.getElementById("close-daily");
  const closeCupBtn = document.getElementById("close-cup");

  let score = 0;
  let totalScore = 0;
  let energy = 50;
  let clickCount = 0;
  let lastReset = Date.now();

  const cupLeagues = [
    {
      name: "Bronze",
      image: "bronze-cup.png",
      required: 0,
      background: "#2d2d2d",
      description: "Beginner tier. Everyone starts here."
    },
    {
      name: "Silver",
      image: "silver-cup.png",
      required: 60,
      background: "#555",
      description: "You've gained some experience."
    },
    {
      name: "Gold",
      image: "gold-cup.png",
      required: 80,
      background: "#664400",
      description: "Your shine stands out."
    },
    {
      name: "Emerald",
      image: "emerald-cup.png",
      required: 110,
      background: "#0f4d4d",
      description: "Green brilliance emerges."
    },
    {
      name: "Sapphire",
      image: "sapphire-cup.png",
      required: 140,
      background: "#001f3f",
      description: "Blue royalty unlocked."
    },
    {
      name: "Ruby",
      image: "ruby-cup.png",
      required: 180,
      background: "#660033",
      description: "Bold and brilliant in red."
    },
    {
      name: "Diamond",
      image: "diamond-cup.png",
      required: 220,
      background: "#223344",
      description: "Shining like a gem."
    },
    {
      name: "Legendary",
      image: "legendary-cup.png",
      required: 270,
      background: "#000000",
      description: "Only the top reach here."
    }
  ];

  function getCurrentCup(score) {
    for (let i = cupLeagues.length - 1; i >= 0; i--) {
      if (score >= cupLeagues[i].required) {
        return cupLeagues[i];
      }
    }
    return cupLeagues[0];
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
    const current = getCurrentCup(totalScore);
    currentCupDisplay.textContent = `${current.name} League`;
    cupPopup.style.background = current.background;
    renderCupSlider(current.name);
  }

  function renderCupSlider(activeLeagueName) {
    cupSlider.innerHTML = "";

    cupLeagues.forEach((cup) => {
      const card = document.createElement("div");
      card.className = "cup-card";
      if (cup.name === activeLeagueName) card.classList.add("active");

      const img = document.createElement("img");
      img.src = `images/cups/${cup.image}`;
      img.alt = `${cup.name} Cup`;

      const caption = document.createElement("div");
      caption.className = "cup-info-text";
      caption.textContent = `${cup.name} — ${cup.description}`;

      card.appendChild(img);
      card.appendChild(caption);
      cupSlider.appendChild(card);
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
    cupPopup.class

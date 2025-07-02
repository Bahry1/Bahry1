document.addEventListener("DOMContentLoaded", () => {
  const sunCoin = document.getElementById("sun-coin");
  const scoreDisplay = document.getElementById("current-score");
  const energyBarFill = document.getElementById("bottom-energy-bar-fill");
  const leagueLabel = document.getElementById("current-league-label");

  let score = 0;
  let energy = 50.0;
  const energyMax = 50.0;
  const costPerClick = 0.01;

  function updateUI() {
    // به‌روزرسانی امتیاز
    scoreDisplay.innerHTML = `${score.toFixed(2)} <span class="score-label">SUN</span>`;

    // آپدیت نوار انرژی
    const percent = Math.max(0, (energy / energyMax) * 100);
    energyBarFill.style.width = `${percent}%`;
  }

  // کلیک روی سکه
  sunCoin.addEventListener("click", () => {
    if (energy >= costPerClick) {
      score += costPerClick;
      energy -= costPerClick;

      // افکت کلیک روی سکه
      sunCoin.style.transform = "scale(0.96)";
      setTimeout(() => {
        sunCoin.style.transform = "scale(1)";
      }, 150);

      updateUI();
    }
  });

  // کلیک روی نوشته لیگ → رفتن به صفحه کاپ‌ها
  leagueLabel.addEventListener("click", () => {
    window.location.href = "cups.html";
  });

  updateUI();
});

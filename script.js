document.addEventListener("DOMContentLoaded", () => {
  const sunCoin = document.getElementById("sun-coin");
  const scoreDisplay = document.getElementById("current-score");
  const energyBarFill = document.getElementById("bottom-energy-bar-fill");
  const leagueLabel = document.getElementById("current-league-label");

  let score = 0;
  let energy = 50;
  const energyMax = 50;

  function updateUI() {
    // نمایش امتیاز
    scoreDisplay.innerHTML = `${score} <span class="score-label">SUN</span>`;

    // بروزرسانی نوار انرژی پایین
    const percent = Math.max(0, Math.min((energy / energyMax) * 100, 100));
    energyBarFill.style.width = `${percent}%`;
  }

  sunCoin.addEventListener("click", () => {
    const cost = 0.5;
    if (energy < cost) return;

    score++;
    energy -= cost;

    // انیمیشن سکه
    sunCoin.style.transform = "scale(1.07)";
    setTimeout(() => {
      sunCoin.style.transform = "scale(1)";
    }, 150);

    updateUI();
  });

  // کلیک روی نوشتهٔ لیگ → هدایت به صفحهٔ کاپ‌ها
  leagueLabel.addEventListener("click", () => {
    window.location.href = "cups.html"; // می‌تونی لینک دلخواه بزاری اینجا
  });

  updateUI();
});

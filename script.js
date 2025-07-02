document.addEventListener("DOMContentLoaded", () => {
  const sunCountEl = document.getElementById("sun-count");
  const sunCoin = document.getElementById("sun-coin");
  const energyBar = document.getElementById("energy-bar-fill");

  let sunScore = 0.0;
  let energy = 50.0;
  const maxEnergy = 50.0;
  const energyPerClick = 0.01;

  function updateUI() {
    sunCountEl.textContent = sunScore.toFixed(2);
    const percent = Math.max(0, (energy / maxEnergy) * 100);
    energyBar.style.width = `${percent}%`;
  }

  sunCoin.addEventListener("click", () => {
    if (energy >= energyPerClick) {
      sunScore += energyPerClick;
      energy -= energyPerClick;

      // افکت انیمیشن سکه
      sunCoin.style.transform = "scale(0.94)";
      setTimeout(() => {
        sunCoin.style.transform = "scale(1)";
      }, 120);

      updateUI();
    }
  });

  updateUI();
});

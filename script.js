document.addEventListener("DOMContentLoaded", () => {
  const sunCountEl = document.getElementById("sun-count");
  const sunCoin = document.getElementById("sun-coin");
  const energyBar = document.getElementById("energy-bar-fill");

  let sunScore = 0.00;
  let energy = 50.00;
  const maxEnergy = 50.00;
  const clickCost = 0.01;

  function updateUI() {
    sunCountEl.textContent = sunScore.toFixed(2);
    const percent = Math.max(0, (energy / maxEnergy) * 100);
    energyBar.style.width = `${percent}%`;
  }

  sunCoin.addEventListener("click", () => {
    if (energy >= clickCost) {
      sunScore += clickCost;
      energy -= clickCost;

      sunCoin.style.transform = "scale(0.94)";
      setTimeout(() => {
        sunCoin.style.transform = "scale(1)";
      }, 150);

      updateUI();
    }
  });

  updateUI();
});

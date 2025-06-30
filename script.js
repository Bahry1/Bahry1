const sunCoin = document.getElementById("sun-coin");
const scoreDisplay = document.getElementById("current-score");
const energyBar = document.getElementById("energy-bar-fill");

let score = 0;
let energy = 100;

sunCoin.addEventListener("click", () => {
  if (energy <= 0) return;

  sunCoin.classList.add("coin-tap-animation");

  score++;
  scoreDisplay.textContent = score;

  energy -= 5;
  if (energy < 0) energy = 0;
  energyBar.style.width = `${energy}%`;

  setTimeout(() => {
    sunCoin.classList.remove("coin-tap-animation");
  }, 150);
});

const sunCoin = document.getElementById("sun-coin");
const scoreDisplay = document.getElementById("current-score");
const energyBar = document.getElementById("energy-bar-fill");

let score = 0;
let energy = 100; // starts full

sunCoin.addEventListener("click", () => {
  if (energy <= 0) return;

  // Add animation class
  sunCoin.classList.add("coin-tap-animation");

  // Increase score
  score++;
  scoreDisplay.textContent = score;

  // Decrease energy
  energy -= 05;
  if (energy < 0) energy = 100;
  energyBar.style.width = `${energy}%`;

  // Remove animation after 150ms
  setTimeout(() => {
    sunCoin.classList.remove("coin-tap-animation");
  }, 150);
});

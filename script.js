const sunCoin = document.getElementById("sun-coin");
const scoreDisplay = document.getElementById("current-score");

let score = 0;

sunCoin.addEventListener("click", () => {
  // Animation effect
  sunCoin.classList.add("coin-tap-animation");

  // Increase score
  score++;
  scoreDisplay.textContent = score;

  // Remove animation to allow re-trigger
  setTimeout(() => {
    sunCoin.classList.remove("coin-tap-animation");
  }, 150);
});

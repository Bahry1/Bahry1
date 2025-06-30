// Select DOM elements
const sunCoin = document.getElementById("sun-coin");
const scoreDisplay = document.getElementById("current-score");

let score = 0;

// Handle sun coin click
sunCoin.addEventListener("click", () => {
  // Trigger tap animation
  sunCoin.classList.add("coin-tap-animation");

  // Increase score
  score++;
  scoreDisplay.textContent = score;

  // Remove animation class to allow retriggering
  setTimeout(() => {
    sunCoin.classList.remove("coin-tap-animation");
  }, 150);
});

// Optional: If needed later, you can add sound or energy updates here
/*
function playCoinSound() {
  const audio = new Audio('click.mp3');
  audio.play();
}

function updateEnergyBar() {
  // logic for energy decrease or progress
}
*/

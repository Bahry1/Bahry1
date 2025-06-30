const coin = document.getElementById('sun-coin');
const scoreEl = document.getElementById('current-score');
const cupDetailsBtn = document.getElementById('cup-details-button');
const energyBarFill = document.getElementById('energy-bar-fill');
let score = 0;
let tapPower = 1;
let maxEnergy = 1000;
let currentEnergy = maxEnergy;
let userJoinedChannel = false;

coin.addEventListener('click', () => {
  if (currentEnergy < tapPower) return;

  score += tapPower;
  currentEnergy -= tapPower;
  scoreEl.textContent = score;
  updateEnergyBar();

  coin.classList.add('coin-tap-animation');
  setTimeout(() => coin.classList.remove('coin-tap-animation'), 100);
});

cupDetailsBtn.addEventListener('click', () => {
  alert("Your current rank is Bronze.\nNext rank: Silver at 1000 SUN.");
});

document.getElementById('ref-button').addEventListener('click', () => {
  alert("Referral system coming soon.");
});

document.getElementById('channels-button').addEventListener('click', () => {
  if (!userJoinedChannel) {
    score += 100;
    userJoinedChannel = true;
    scoreEl.textContent = score;
    alert("You received 100 SUN for joining!");
  } else {
    alert("You already joined the channel.");
  }
});

document.getElementById('wallet-button').addEventListener('click', () => {
  alert("Wallet feature coming soon.");
});

document.getElementById('daily-button').addEventListener('click', () => {
  if (score >= 50) {
    tapPower += 1;
    score -= 50;
    scoreEl.textContent = score;
    alert("Tap power upgraded!");
  } else {
    alert("Not enough SUN to upgrade.");
  }
});

function updateEnergyBar() {
  let percent = (currentEnergy / maxEnergy) * 100;
  energyBarFill.style.width = percent + "%";
}

setInterval(() => {
  if (currentEnergy < maxEnergy) {
    currentEnergy += 2;
    if (currentEnergy > maxEnergy) currentEnergy = maxEnergy;
    updateEnergyBar();
  }
}, 100);

function createStar() {
  const star = document.createElement('div');
  star.classList.add('star');
  const size = Math.random() * 3 + 2;
  star.style.width = star.style.height = size + 'px';
  star.style.top = Math.random() * 100 + '%';
  star.style.left = Math.random() * 100 + '%';
  star.style.animationDuration = (Math.random() * 2 + 1) + 's';
  document.getElementById('coin-background').appendChild(star);
  setTimeout(() => star.remove(), 4000);
}

setInterval(createStar, 300);

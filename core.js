const MAX_ENERGY = 50;
let energy = 0;
let sun = 0;
let tapCount = 0;

const getTodayDate = () => new Date().toISOString().split("T")[0];

const saveData = () => {
  localStorage.setItem("energy", energy.toString());
  localStorage.setItem("sun", sun.toString());
  localStorage.setItem("tapCount", tapCount.toString());
};

const loadData = () => {
  energy = parseFloat(localStorage.getItem("energy")) || 0;
  sun = parseFloat(localStorage.getItem("sun")) || 0;
  tapCount = parseInt(localStorage.getItem("tapCount")) || 0;
};

const updateUI = () => {
  const bar = document.getElementById("energy-bar-fill");
  if (bar) {
    const percent = (energy / MAX_ENERGY) * 100;
    bar.style.width = percent + "%";
    bar.style.background = percent <= 10 ? "#f33" : "#0cf";
  }

  const sunEl = document.getElementById("sun-count");
  if (sunEl) {
    sunEl.textContent = sun.toFixed(2);
  }

  const tapEl = document.getElementById("tap-count");
  if (tapEl) {
    tapEl.textContent = tapCount;
  }
};

window.ZerinCore = {
  MAX_ENERGY,
  getEnergy: () => energy,
  getSun: () => sun,
  getTapCount: () => tapCount,

  loadData: () => {
    loadData();
    updateUI();
  },

  saveData: () => {
    saveData();
  },

  updateUI: () => {
    updateUI();
  },

  useEnergy: (amount) => {
    if (energy >= amount) {
      energy -= amount;
      saveData();
      updateUI();
      return true;
    }
    return false;
  },

  addSun: (amount) => {
    sun += amount;
    saveData();
    updateUI();
  },

  addTap: () => {
    tapCount++;
    saveData();
    updateUI();
  },

  rechargeEnergy: (amount) => {
    energy = Math.min(MAX_ENERGY, energy + amount);
    saveData();
    updateUI();
  },

  resetAll: () => {
    energy = MAX_ENERGY;
    sun = 0;
    tapCount = 0;
    saveData();
    updateUI();
  }
};

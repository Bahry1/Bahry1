(function () {
  const maxEnergyRaw = 5000; // یعنی 50.00
  let sun = 0;        // ← یعنی 0.00
  let energy = maxEnergyRaw; // ← یعنی 50.00
  let tapCount = 0;

  function loadData() {
    sun = parseInt(localStorage.getItem("sunRaw")) || 0;
    energy = parseInt(localStorage.getItem("energyRaw")) || maxEnergyRaw;
    tapCount = parseInt(localStorage.getItem("tapCount")) || 0;
  }

  function saveData() {
    localStorage.setItem("sunRaw", sun.toString());
    localStorage.setItem("energyRaw", energy.toString());
    localStorage.setItem("tapCount", tapCount.toString());
  }

  function updateSun() {
    const el = document.getElementById("sun-count");
    if (el) el.textContent = (sun / 100).toFixed(2);
  }

  function updateEnergyBar() {
    const bar = document.getElementById("energy-bar-fill");
    const label = document.getElementById("energy-display") || document.querySelector(".energy-label");
    const percent = (energy / maxEnergyRaw) * 100;

    if (bar) {
      bar.style.width = percent + "%";
      bar.classList.remove("low", "normal");
      bar.classList.add(percent <= 10 ? "low" : "normal");
    }

    if (label) {
      label.textContent = `${(energy / 100).toFixed(0)} / ${(maxEnergyRaw / 100).toFixed(0)} Energy`;
    }
  }

  function updateTap() {
    const el = document.getElementById("tap-count");
    if (el) el.textContent = tapCount.toString();
  }

  window.ZerinCore = {
    getSun: () => sun / 100,
    getEnergy: () => energy / 100,
    getTapCount: () => tapCount,
    addSun: (val) => {
      sun += Math.round(val * 100); // ← تبدیل به عدد صحیح
      saveData();
      updateSun();
    },
    addTap: () => {
      tapCount++;
      saveData();
      updateTap();
    },
    useEnergy: (val) => {
      const cost = Math.round(val * 100);
      if (energy >= cost) {
        energy -= cost;
        saveData();
        updateEnergyBar();
        return true;
      }
      return false;
    },
    rechargeEnergy: (val) => {
      energy = Math.min(energy + Math.round(val * 100), maxEnergyRaw);
      saveData();
      updateEnergyBar();
    },
    resetAll: () => {
      sun = 0;
      energy = maxEnergyRaw;
      tapCount = 0;
      saveData();
      ZerinCore.updateUI();
    },
    updateUI: () => {
      updateSun();
      updateEnergyBar();
      updateTap();
    },
    loadData: loadData,
    MAX_ENERGY: maxEnergyRaw / 100
  };

  document.addEventListener("DOMContentLoaded", () => {
    loadData();
    ZerinCore.updateUI();
  });

  window.addEventListener("pageshow", () => {
    loadData();
    ZerinCore.updateUI();
  });

  window.addEventListener("focus", () => {
    loadData();
    ZerinCore.updateUI();
  });
})();

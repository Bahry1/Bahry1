(function () {
  const maxEnergy = 50;

  let sun = 0.0;
  let energy = maxEnergy;
  let tapCount = 0;

  function loadData() {
    sun = parseFloat(localStorage.getItem("sun")) || 0.0;
    sun = parseFloat(sun.toFixed(2)); // ⬅️ رُند کردن دقیق

    energy = parseFloat(localStorage.getItem("energy")) || maxEnergy;
    energy = parseFloat(energy.toFixed(2)); // ⬅️ رُند کردن دقیق

    tapCount = parseInt(localStorage.getItem("tapCount")) || 0;
  }

  function saveData() {
    localStorage.setItem("sun", sun.toFixed(2));
    localStorage.setItem("energy", energy.toFixed(2));
    localStorage.setItem("tapCount", tapCount.toString());
  }

  function updateSun() {
    const el = document.getElementById("sun-count");
    if (el) el.textContent = sun.toFixed(2);
  }

  function updateEnergyBar() {
    const bar = document.getElementById("energy-bar-fill");
    const label = document.getElementById("energy-display") || document.querySelector(".energy-label");
    const percent = (energy / maxEnergy) * 100;

    if (bar) {
      bar.style.width = percent + "%";
      bar.classList.remove("low", "normal");
      bar.classList.add(percent <= 10 ? "low" : "normal");
    }

    if (label) label.textContent = `${energy.toFixed(0)} / ${maxEnergy} Energy`;
  }

  function updateTap() {
    const el = document.getElementById("tap-count");
    if (el) el.textContent = tapCount.toString();
  }

  window.ZerinCore = {
    getSun: () => sun,
    getEnergy: () => energy,
    getTapCount: () => tapCount,

    addSun: (val) => {
      sun += val;
      sun = parseFloat(sun.toFixed(2)); // ⬅️ رُند شدن پس از اضافه شدن
      saveData();
      updateSun();
    },

    addTap: () => {
      tapCount++;
      saveData();
      updateTap();
    },

    useEnergy: (val) => {
      if (energy >= val) {
        energy -= val;
        energy = parseFloat(energy.toFixed(2)); // ⬅️ رُند کردن انرژی پس از مصرف
        saveData();
        updateEnergyBar();
        return true;
      }
      return false;
    },

    rechargeEnergy: (val) => {
      energy = Math.min(energy + val, maxEnergy);
      energy = parseFloat(energy.toFixed(2)); // ⬅️ رُند کردن پس از شارژ
      saveData();
      updateEnergyBar();
    },

    resetAll: () => {
      sun = 0;
      energy = maxEnergy;
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
    MAX_ENERGY: maxEnergy
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

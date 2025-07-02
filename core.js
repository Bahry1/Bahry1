// core.js — مغز ZerinSun (نسخه با Tap Count)

document.addEventListener("DOMContentLoaded", () => {
  const maxEnergy = 50;

  let sun = parseFloat(localStorage.getItem("sun")) || 0.0;
  let energy = parseFloat(localStorage.getItem("energy")) || maxEnergy;
  let tapCount = parseInt(localStorage.getItem("tapCount")) || 0;

  function saveData() {
    localStorage.setItem("sun", sun.toFixed(2));
    localStorage.setItem("energy", energy.toFixed(2));
    localStorage.setItem("tapCount", tapCount.toString());
  }

  function updateSun() {
    const sunEl = document.getElementById("sun-count");
    if (sunEl) sunEl.textContent = sun.toFixed(2);
  }

  function updateEnergyBar() {
    const energyFill = document.getElementById("energy-bar-fill");
    const energyLabel = document.querySelector(".energy-label");

    if (energyFill) {
      energyFill.style.width = `${(energy / maxEnergy) * 100}%`;
    }

    if (energyLabel) {
      energyLabel.textContent = `${energy.toFixed(0)} / ${maxEnergy} Energy`;
    }
  }

  function updateTapCount() {
    const tapEl = document.getElementById("tap-count");
    if (tapEl) tapEl.textContent = tapCount.toString();
  }

  window.ZerinCore = {
    getSun: () => sun,
    getEnergy: () => energy,
    getTapCount: () => tapCount,
    addSun: (amount) => {
      sun += amount;
      saveData();
      updateSun();
    },
    useEnergy: (amount) => {
      if (energy >= amount) {
        energy -= amount;
        saveData();
        updateEnergyBar();
        return true;
      }
      return false;
    },
    rechargeEnergy: (amount) => {
      energy = Math.min(energy + amount, maxEnergy);
      saveData();
      updateEnergyBar();
    },
    resetEnergy: () => {
      energy = maxEnergy;
      saveData();
      updateEnergyBar();
    },
    addTap: () => {
      tapCount++;
      saveData();
      updateTapCount();
    },
    resetTapCount: () => {
      tapCount = 0;
      saveData();
      updateTapCount();
    },
    updateUI: () => {
      updateSun();
      updateEnergyBar();
      updateTapCount();
    },
    MAX_ENERGY: maxEnergy
  };

  ZerinCore.updateUI();
});

window.addEventListener("pageshow", () => {
  if (window.ZerinCore) ZerinCore.updateUI();
});

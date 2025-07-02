// core.js — مغز ZerinSun

document.addEventListener("DOMContentLoaded", () => {
  const maxEnergy = 50;

  // خواندن مقدارها از localStorage یا مقدار پیش‌فرض
  let sun = parseFloat(localStorage.getItem("sun")) || 0.0;
  let energy = parseFloat(localStorage.getItem("energy")) || maxEnergy;

  // به‌روزرسانی مقدار در localStorage
  function saveData() {
    localStorage.setItem("sun", sun.toFixed(2));
    localStorage.setItem("energy", energy.toFixed(2));
  }

  // نمایش مقدار SUN در المنتی با id="sun-count"
  function updateSun() {
    const sunEl = document.getElementById("sun-count");
    if (sunEl) sunEl.textContent = sun.toFixed(2);
  }

  // نمایش نوار انرژی و مقدار آن
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

  // API عمومی برای استفاده در تمام صفحات
  window.ZerinCore = {
    getSun: () => sun,
    getEnergy: () => energy,
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
    updateUI: () => {
      updateSun();
      updateEnergyBar();
    },
    MAX_ENERGY: maxEnergy
  };

  // اجرای اولیه هنگام بارگذاری
  ZerinCore.updateUI();
});

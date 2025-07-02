(function () {
  const maxEnergyRaw = 5000; // معادل 50.00
  let sun = 0;
  let energy = maxEnergyRaw;
  let tapCount = 0;

  function getTodayKey() {
    return new Date().toDateString(); // "Mon Jul 8 2025"
  }

  function loadData() {
    const rawSun = localStorage.getItem("sunRaw");
    sun = rawSun !== null ? parseFloat(rawSun) : 0;

    const rawEnergy = localStorage.getItem("energyRaw");
    energy = rawEnergy !== null ? parseFloat(rawEnergy) : maxEnergyRaw;

    const rawTap = localStorage.getItem("tapCount");
    tapCount = rawTap !== null ? parseInt(rawTap) : 0;

    sun = Math.round(sun);
    energy = Math.round(energy);
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

  function checkEnergyReset() {
    const now = new Date();
    const today = getTodayKey();
    const alreadyReset = localStorage.getItem("energyReset") === today;

    if (!alreadyReset && now.getHours() === 23 && now.getMinutes() >= 55) {
      energy = 0;
      saveData();
      localStorage.setItem("energyReset", today);
      console.log("🔥 Energy burned at 23:55");
    }
  }

  function checkEnergyCharge() {
    const now = new Date();
    const today = getTodayKey();
    const alreadyCharged = localStorage.getItem("energyCharge") === today;

    if (!alreadyCharged && now.getHours() === 0 && now.getMinutes() >= 5) {
      energy = maxEnergyRaw;
      saveData();
      localStorage.setItem("energyCharge", today);
      console.log("⚡ Energy charged at 00:05");
    }
  }

  window.ZerinCore = {
    getSun: () => sun / 100,
    getEnergy: () => energy / 100,
    getTapCount: () => tapCount,
    addSun: (val) => {
      sun += Math.round(val * 100);
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
    MAX_ENERGY: maxEnergyRaw / 100,
    checkDailyCycle: () => {
      checkEnergyReset();
      checkEnergyCharge();
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    loadData();
    ZerinCore.updateUI();
    setInterval(ZerinCore.checkDailyCycle, 60000); // بررسی هر ۶۰ ثانیه
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

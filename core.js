const ZerinCore = {
  MAX_ENERGY: 50,

  CUP_LEVELS: [
    { name: "Bronze", min: 50 },
    { name: "Silver", min: 100 },
    { name: "Gold", min: 180 },
    { name: "Emerald", min: 250 },
    { name: "Sapphire", min: 340 },
    { name: "Ruby", min: 410 },
    { name: "Diamond", min: 500 },
    { name: "Legendary", min: 600 }
  ],

  init: function () {
    this.checkEnergyDay();
  },

  // ☀ SUN
  getSun: () => parseFloat(localStorage.getItem("sun") || "0"),
  setSun: val => localStorage.setItem("sun", Math.max(0, val).toFixed(2)),
  addSun: val => ZerinCore.setSun(ZerinCore.getSun() + val),

  // 🔋 ENERGY
  checkEnergyDay: function () {
    const now = new Date();
    const last = new Date(parseInt(localStorage.getItem("energyResetAt") || "0"));
    const isNewDay = now.toDateString() !== last.toDateString();
    if (isNewDay) {
      localStorage.setItem("energy", this.MAX_ENERGY.toFixed(3));
      localStorage.setItem("energyResetAt", now.getTime().toString());
    }
  },

  getEnergy: function () {
    this.checkEnergyDay();
    return parseFloat(localStorage.getItem("energy") || "0");
  },

  getEnergyDisplay: function () {
    return this.getEnergy().toFixed(3) + " / " + this.MAX_ENERGY;
  },

  useEnergy: function (amt) {
    this.checkEnergyDay();
    let current = this.getEnergy();
    if (current < amt) return false;
    localStorage.setItem("energy", (current - amt).toFixed(3));
    return true;
  },

  setEnergy: function (amt) {
    const clean = Math.max(0, Math.min(amt, this.MAX_ENERGY));
    localStorage.setItem("energy", clean.toFixed(3));
  },

  // 🎖️ کاپ‌ها
  getCupLevel: () => localStorage.getItem("cupLevel") || "Bronze",
  getCupProgress: () => parseFloat(localStorage.getItem("cupProgress") || "0"),

  gainEnergy: function (amt) {
    this.checkEnergyDay();
    const current = this.getEnergy();
    const canAdd = Math.min(this.MAX_ENERGY - current, amt);
    if (canAdd <= 0) return false;

    // اضافه کردن انرژی
    localStorage.setItem("energy", (current + canAdd).toFixed(3));

    // افزایش کاپ
    let progress = this.getCupProgress() + canAdd;
    localStorage.setItem("cupProgress", progress.toFixed(3));
    this.checkCupLevelUp();
    return true;
  },

  checkCupLevelUp: function () {
    let progress = this.getCupProgress();
    for (let i = this.CUP_LEVELS.length - 1; i >= 0; i--) {
      if (progress >= this.CUP_LEVELS[i].min) {
        localStorage.setItem("cupLevel", this.CUP_LEVELS[i].name);
        break;
      }
    }
  }
};

ZerinCore.init();

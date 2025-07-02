const ZerinCore = {
  MAX_ENERGY: 50,

  init: function () {
    this.checkEnergyDay();
  },

  // ----------------------------
  // 🟡 SUN
  getSun: function () {
    return parseFloat(localStorage.getItem("sun") || "0");
  },

  setSun: function (amount) {
    localStorage.setItem("sun", Math.max(0, amount).toFixed(2));
  },

  addSun: function (amount) {
    let current = this.getSun();
    this.setSun(current + amount);
  },

  spendSun: function (amount) {
    let current = this.getSun();
    if (current >= amount) {
      this.setSun(current - amount);
      return true;
    }
    return false;
  },

  // ----------------------------
  // 🔋 ENERGY
  checkEnergyDay: function () {
    const now = new Date();
    const stored = localStorage.getItem("energyResetAt");
    const lastReset = stored ? new Date(parseInt(stored)) : null;

    const isNewDay = !lastReset || now.toDateString() !== lastReset.toDateString();

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

  useEnergy: function (amount) {
    this.checkEnergyDay();
    let current = this.getEnergy();
    if (current < amount) return false;
    let updated = current - amount;
    localStorage.setItem("energy", updated.toFixed(3));
    return true;
  },

  setEnergy: function (amount) {
    let clean = Math.max(0, Math.min(amount, this.MAX_ENERGY));
    localStorage.setItem("energy", clean.toFixed(3));
  }
};

// فعال‌سازی هنگام بارگذاری
ZerinCore.init();

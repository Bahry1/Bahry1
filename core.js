const MAX_ENERGY = 50;
let energy = 0;
let sun = 0;
let tapCount = 0;
let currentCup = "";

const saveData = () => {
  localStorage.setItem("energy", energy.toString());
  localStorage.setItem("sun", sun.toString());
  localStorage.setItem("tapCount", tapCount.toString());
  localStorage.setItem("currentCup", currentCup);
};

const loadData = () => {
  energy = parseFloat(localStorage.getItem("energy")) || MAX_ENERGY;
  sun = parseFloat(localStorage.getItem("sun")) || 0;
  tapCount = parseInt(localStorage.getItem("tapCount")) || 0;
  currentCup = localStorage.getItem("currentCup") || "";
};

const updateUI = () => {
  const bar = document.getElementById("energy-bar-fill");
  if (bar) {
    const percent = (energy / MAX_ENERGY) * 100;
    bar.style.width = percent + "%";
    bar.style.background = percent <= 10 ? "#f33" : "#0cf";
  }

  const sunEl = document.getElementById("sun-value");
  if (sunEl) sunEl.textContent = sun.toFixed(2);

  const tapEl = document.getElementById("tap-count");
  if (tapEl) tapEl.textContent = tapCount;
};

const getCupLevel = () => {
  if (sun >= 600) return "🌟 Legendary";
  if (sun >= 500) return "💎 Diamond";
  if (sun >= 410) return "❤️ Ruby";
  if (sun >= 340) return "💙 Sapphire";
  if (sun >= 250) return "💚 Emerald";
  if (sun >= 180) return "🏆 Gold";
  if (sun >= 100) return "🥈 Silver";
  if (sun >= 50)  return "🥉 Bronze";
  return "🔰 Starter";
};

const getLeague = (val = sun) => getCupLevel(val);

const getLeagueReward = (val = sun) => {
  if (val >= 600) return 80;
  if (val >= 500) return 70;
  if (val >= 410) return 60;
  if (val >= 340) return 50;
  if (val >= 250) return 40;
  if (val >= 180) return 30;
  if (val >= 100) return 20;
  if (val >= 50)  return 10;
  return 0;
};

const checkDailyCycle = () => {
  const today = new Date().toISOString().split("T")[0];
  const last = localStorage.getItem("lastDailyDate");
  if (last !== today) {
    energy = MAX_ENERGY;
    localStorage.setItem("lastDailyDate", today);
    saveData();
  }
};

const canClaimDaily = () => {
  const today = new Date().toISOString().split("T")[0];
  return localStorage.getItem("dailyClaimed") !== today && getLeagueReward() > 0;
};

const claimDailyReward = () => {
  if (!canClaimDaily()) return 0;
  const reward = getLeagueReward();
  sun += reward;
  localStorage.setItem("dailyClaimed", new Date().toISOString().split("T")[0]);
  saveData();
  updateUI();
  return reward;
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

  saveData,
  updateUI,
  checkDailyCycle,
  canClaimDaily,
  claimDailyReward,

  useEnergy: (amt) => {
    if (energy >= amt) {
      energy -= amt;
      saveData();
      updateUI();
      return true;
    }
    return false;
  },

  addSun: (amt) => {
    sun += amt;
    const newCup = getCupLevel();
    if (newCup !== currentCup) {
      currentCup = newCup;
      const bonus = getLeagueReward();
      sun += bonus;
    }
    saveData();
    updateUI();
  },

  addTap: () => {
    tapCount++;
    saveData();
    updateUI();
  },

  rechargeEnergy: (amt) => {
    energy = Math.min(MAX_ENERGY, energy + amt);
    saveData();
    updateUI();
  },

  resetAll: () => {
    energy = MAX_ENERGY;
    sun = 0;
    tapCount = 0;
    currentCup = "";
    localStorage.removeItem("ref-counted");
    localStorage.removeItem("dailyClaimed");
    saveData();
    updateUI();
  },

  getCupLevel,
  getLeague,
  getLeagueReward,

  getUserId: () => {
    let id = localStorage.getItem("userId");
    if (!id) {
      id = "user" + Math.floor(Math.random() * 1e6);
      localStorage.setItem("userId", id);
    }
    return id;
  },

  getInviteCount: () => {
    const id = ZerinCore.getUserId();
    const stats = JSON.parse(localStorage.getItem("refStats") || "{}");
    return stats[id] || 0;
  },

  sendReferral: (referrerId) => {
    if (!referrerId) return;
    const stats = JSON.parse(localStorage.getItem("refStats") || "{}");
    stats[referrerId] = (stats[referrerId] || 0) + 1;
    localStorage.setItem("refStats", JSON.stringify(stats));
  },

  getReferralReward: (count) => {
    if (count >= 1 && count <= 5) return 5;
    if (count <= 10) return 10;
    if (count <= 15) return 15;
    if (count <= 20) return 20;
    if (count <= 30) return 30;
    return 0;
  },

  addReferralReward: () => {
    const count = ZerinCore.getInviteCount();
    const reward = ZerinCore.getReferralReward(count);
    if (reward > 0) {
      sun += reward;
      saveData();
      updateUI();
    }
  }
};

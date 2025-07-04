document.addEventListener("DOMContentLoaded", () => {
  const sunCoin = document.getElementById("sun-coin");
  const sunAmount = document.getElementById("sunAmount");
  const sunBar = document.getElementById("sunBar");

  if (!sunCoin || !window.ZerinCore) return;

  let loaded = false;

  // ⚡ بروزرسانی رابط کاربری
  function updateUI() {
    if (sunAmount) {
      sunAmount.textContent = ZerinCore.getSun().toFixed(2) + " SUN";
    }

    if (sunBar) {
      const percent = Math.min(ZerinCore.getEnergy() * 100, 100); // جلوگیری از overflow
      sunBar.style.width = percent + "%";
    }
  }

  // 🎯 رویداد کلیک روی خورشید
  function initClick() {
    if (loaded) return;
    loaded = true;

    sunCoin.addEventListener("click", () => {
      const TAP_VALUE = 0.25;
      const currentEnergy = Math.round(ZerinCore.getEnergy() * 100) / 100;

      if (currentEnergy >= TAP_VALUE) {
        if (ZerinCore.useEnergy(TAP_VALUE)) {
          ZerinCore.addSun(TAP_VALUE);
          ZerinCore.addTap();

          // انیمیشن
          sunCoin.style.transform = "scale(0.94)";
          setTimeout(() => sunCoin.style.transform = "scale(1)", 150);

          updateUI(); // 🌞 بروزرسانی بعد از کلیک
        }
      }
    });
  }

  // ⏳ لود اولیه‌ی دیتا و راه‌اندازی UI
  setTimeout(() => {
    ZerinCore.loadData(); // داده‌ها رو لود کن
    updateUI();            // 🌈 رابط کاربری رو مقداردهی کن
    initClick();           // کلیک‌هارو فعال کن
  }, 200);
});

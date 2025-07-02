document.addEventListener("DOMContentLoaded", () => {
  const sunCoin = document.getElementById("sun-coin");

  if (!sunCoin || !window.ZerinCore) return;

  // 💡 تاخیر کوتاه برای اطمینان از لود کامل اطلاعات
  setTimeout(() => {
    sunCoin.addEventListener("click", () => {
      const TAP_VALUE = 0.01;
      const currentEnergy = ZerinCore.getEnergy();

      if (currentEnergy >= TAP_VALUE) {
        if (ZerinCore.useEnergy(TAP_VALUE)) {
          ZerinCore.addSun(TAP_VALUE);
          ZerinCore.addTap();

          // انیمیشن کلیک روی سکه
          sunCoin.style.transform = "scale(0.94)";
          setTimeout(() => {
            sunCoin.style.transform = "scale(1)";
          }, 150);
        }
      }
    });
  }, 100); // ⏱ تأخیر برای اطمینان از لود کامل core.js
});

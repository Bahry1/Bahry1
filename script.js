document.addEventListener("DOMContentLoaded", () => {
  const sunCoin = document.getElementById("sun-coin");

  if (!sunCoin || !window.ZerinCore) return;

  sunCoin.addEventListener("click", () => {
    const TAP_VALUE = 0.01; // ✅ مقدار استاندارد تب کردن

    if (ZerinCore.useEnergy(TAP_VALUE)) {
      ZerinCore.addSun(TAP_VALUE);
      ZerinCore.addTap();

      // افکت کلیک روی سکه
      sunCoin.style.transform = "scale(0.94)";
      setTimeout(() => {
        sunCoin.style.transform = "scale(1)";
      }, 150);
    }
  });
});

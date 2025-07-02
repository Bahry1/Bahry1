document.addEventListener("DOMContentLoaded", () => {
  const sunCoin = document.getElementById("sun-coin");

  if (!sunCoin || !window.ZerinCore) return;

  sunCoin.addEventListener("click", () => {
    if (ZerinCore.useEnergy(0.01)) {
      ZerinCore.addSun(0.01);
      ZerinCore.addTap();

      sunCoin.style.transform = "scale(0.94)";
      setTimeout(() => sunCoin.style.transform = "scale(1)", 150);
    }
  });
});

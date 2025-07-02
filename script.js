document.addEventListener("DOMContentLoaded", () => {
  const sunCoin = document.getElementById("sun-coin");

  if (!sunCoin || !window.ZerinCore) return;

  let loaded = false;

  function initClick() {
    if (loaded) return;
    loaded = true;

    sunCoin.addEventListener("click", () => {
      const TAP_VALUE = 0.01;
      const currentEnergy = parseFloat(ZerinCore.getEnergy().toFixed(2));

      if (currentEnergy >= TAP_VALUE) {
        if (ZerinCore.useEnergy(TAP_VALUE)) {
          ZerinCore.addSun(TAP_VALUE);
          ZerinCore.addTap();

          sunCoin.style.transform = "scale(0.94)";
          setTimeout(() => sunCoin.style.transform = "scale(1)", 150);
        }
      }
    });
  }

  setTimeout(() => {
    ZerinCore.loadData(); // اطمینان بیشتر
    initClick();
  }, 200);
});

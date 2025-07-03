// notifier.js
function notify(message, type = "info", duration = 3000) {
  const el = document.getElementById("notifier");
  if (!el) return;

  el.textContent = message;

  // حذف کلاس‌های قبلی
  el.className = "";
  el.classList.add("show", type);

  // بستن قبلی (در صورت نیاز)
  clearTimeout(window._notifierTimer);
  window._notifierTimer = setTimeout(() => {
    el.classList.remove("show");
  }, duration);
}

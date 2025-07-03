function notify(message, type = "info", duration = 3000) {
  const el = document.getElementById("notifier");
  if (!el) return;

  el.textContent = message;

  el.className = "";
  el.classList.add("show", type);

  clearTimeout(window._notifierTimer);
  window._notifierTimer = setTimeout(() => {
    el.classList.remove("show");
  }, duration);
}

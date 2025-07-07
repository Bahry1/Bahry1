async function loadChannels() {
  try {
    const res = await fetch('../channels.json');
    const channels = await res.json();
    const box = document.querySelector('.channel-box');

    if (!box) return;

    // پاک کردن محتویات قبلی (اختیاری)
    box.innerHTML = '';

    channels.forEach(c => {
      const p = document.createElement('p');
      p.innerHTML = `📣 <a href="${c.url}" target="_blank">${c.name}</a>`;
      box.appendChild(p);
    });
  } catch (err) {
    console.error('⛔ خطا در بارگذاری کانال‌ها:', err);
  }
}

window.addEventListener('DOMContentLoaded', loadChannels);

const canvas = document.getElementById("stars-canvas");
const ctx = canvas.getContext("2d");
let w, h;
let stars = [];

function resizeCanvas() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

function createStars(count) {
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      radius: Math.random() * 1.2,
      alpha: Math.random(),
      speed: Math.random() * 0.015 + 0.002
    });
  }
}

function animateStars() {
  ctx.clearRect(0, 0, w, h);
  for (const star of stars) {
    star.alpha += star.speed;
    if (star.alpha <= 0 || star.alpha >= 1) {
      star.speed = -star.speed;
    }
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
    ctx.fill();
  }
  requestAnimationFrame(animateStars);
}

window.addEventListener("resize", () => {
  resizeCanvas();
  createStars(120);
});

resizeCanvas();
createStars(120);
animateStars();

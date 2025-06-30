const starsContainer = document.getElementById("stars-container");

for (let i = 0; i < 100; i++) {
  const star = document.createElement("div");
  star.classList.add("star");

  const size = Math.random() * 2 + 1;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;

  star.style.top = `${Math.random() * 100}%`;
  star.style.left = `${Math.random() * 100}%`;
  star.style.animationDelay = `${Math.random() * 3}s`;

  starsContainer.appendChild(star);
}

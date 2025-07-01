function renderCupSlider() {
  cupPopup.classList.remove("hidden"); //
  cupSlider.innerHTML = "";

  const images = [
    "bronze-cup.png",
    "silver-cup.png",
    "gold-cup.png"
  ];

  images.forEach((file) => {
    const img = document.createElement("img");
    img.src = `images/cups/${file}`;
    img.alt = file;
    img.style.width = "100px";
    img.style.margin = "10px";
    img.style.border = "2px solid lime";
    img.style.background = "#222";
    img.onerror = () => {
      console.error("Could not load:", img.src);
    };
    cupSlider.appendChild(img);
  });
}

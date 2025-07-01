function renderCupSlider() {
  cupSlider.innerHTML = "";

  const testImages = ["bronze-cup.png", "silver-cup.png", "gold-cup.png"];

  testImages.forEach((filename) => {
    const testImg = document.createElement("img");
    testImg.src = `images/cups/${filename}`;
    testImg.alt = filename;
    testImg.style.width = "100px";
    testImg.style.marginRight = "10px";
    testImg.style.border = "2px solid lime";

    testImg.onerror = () => {
      console.error("Failed to load:", testImg.src);
    };

    cupSlider.appendChild(testImg);
  });
}

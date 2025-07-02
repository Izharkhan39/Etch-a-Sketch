const container = document.querySelector(".container");

const clearCanvasBtn = document.querySelector("#clearCanvasBtn");
const eraserBtn = document.querySelector("#eraserBtn");
const colorBtn = document.querySelector("#colorBtn");
const rainbowBtn = document.querySelector("#rainbowBtn");

const pixelSlider = document.querySelector("#pixelSlider");
const sliderValue = document.querySelector(".slider-value");
let gridSize = 16;
let isDrawing = false;
let isErasing = false;
let isRainbowMode = false;
let isMouseDown = false;

//Takes Input from the slider and creates a grid
pixelSlider.addEventListener("input", () => {
  gridSize = pixelSlider.value;
  sliderValue.textContent = `${gridSize} x ${gridSize}`;
  console.log(gridSize);
  createGrid(gridSize);
});

clearCanvasBtn.addEventListener("click", () => {
  location.reload();
  console.log("clearing");
});

function resetActiveButtons() {
  colorBtn.classList.remove("active");
  rainbowBtn.classList.remove("active");
  eraserBtn.classList.remove("active");
}

colorBtn.addEventListener("click", () => {
  resetActiveButtons();
  isDrawing = true;

  isErasing = false;
  isRainbowMode = false;
  colorBtn.classList.add("active");
});

rainbowBtn.addEventListener("click", () => {
  resetActiveButtons();
  isRainbowMode = true;

  isDrawing = false;
  isErasing = false;
  rainbowBtn.classList.add("active");
});
eraserBtn.addEventListener("click", () => {
  resetActiveButtons();
  isErasing = true;

  isDrawing = false;
  isRainbowMode = false;
  eraserBtn.classList.add("active");
});

document.addEventListener("mousedown", (e) => {
  if (e.button !== 0) return;
  isMouseDown = true;
});
document.addEventListener("mouseup", () => {
  isDrawing = false;
  isMouseDown = false;
  // isRainbowMode = false;
  console.log("Drawing stopped");
});
container.addEventListener("dragstart", (e) => {
  e.preventDefault();
});

function createGrid(size) {
  container.innerHTML = "";

  const pixelSize = 100 / size;

  for (let i = 0; i < size * size; i++) {
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");
    pixel.style.width = `${pixelSize}%`;
    pixel.style.height = `${pixelSize}%`;

    pixel.addEventListener("mousedown", () => {
      if (isErasing) {
        pixel.style.backgroundColor = "white";
      } else if (isRainbowMode) {
        pixel.style.backgroundColor = getRandomColor();
      } else {
        pixel.style.backgroundColor = "black";
      }
    });

    pixel.addEventListener("mouseover", () => {
      if (!isMouseDown) return; // Only draw/erase when mouse is down

      if (isErasing) {
        pixel.style.backgroundColor = "white";
      } else if (isRainbowMode) {
        pixel.style.backgroundColor = getRandomColor();
      } else {
        pixel.style.backgroundColor = "black";
      }
    });
    container.appendChild(pixel);
  }
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
createGrid(gridSize);

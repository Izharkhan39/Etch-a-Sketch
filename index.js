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
let isTouchActive = false;

// Grid creation
pixelSlider.addEventListener("input", () => {
  gridSize = pixelSlider.value;
  sliderValue.textContent = `${gridSize} x ${gridSize}`;
  createGrid(gridSize);
});

// Button controls
clearCanvasBtn.addEventListener("click", () => location.reload());

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

// Input handling
function handleStart(e) {
  e.preventDefault();
  isMouseDown = true;
  isTouchActive = true;
  processInput(e);
}

function handleMove(e) {
  if (!isMouseDown && !isTouchActive) return;
  e.preventDefault();
  processInput(e);
}

function handleEnd() {
  isMouseDown = false;
  isTouchActive = false;
}

// Universal input processor
function processInput(e) {
  const clientX = e.clientX || e.touches?.[0]?.clientX;
  const clientY = e.clientY || e.touches?.[0]?.clientY;

  if (!clientX || !clientY) return;

  const pixel = document.elementFromPoint(clientX, clientY);
  if (!pixel || !pixel.classList.contains("pixel")) return;

  if (isErasing) {
    pixel.style.backgroundColor = "white";
  } else if (isRainbowMode) {
    pixel.style.backgroundColor = getRandomColor();
  } else {
    pixel.style.backgroundColor = "black";
  }
}

// Event listeners
container.addEventListener("mousedown", handleStart);
document.addEventListener("mousemove", handleMove);
document.addEventListener("mouseup", handleEnd);

container.addEventListener("touchstart", handleStart, { passive: false });
container.addEventListener("touchmove", handleMove, { passive: false });
container.addEventListener("touchend", handleEnd);

container.addEventListener("dragstart", (e) => e.preventDefault());

// Grid creation
function createGrid(size) {
  container.innerHTML = "";
  const pixelSize = 100 / size;

  for (let i = 0; i < size * size; i++) {
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");
    pixel.style.width = `${pixelSize}%`;
    pixel.style.height = `${pixelSize}%`;
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

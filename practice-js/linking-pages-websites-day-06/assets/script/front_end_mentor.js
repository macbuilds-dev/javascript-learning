const decrementBtn        = document.getElementById("decrement-btn");
const incrementBtn        = document.getElementById("increment-btn");
const counterValueDisplay = document.getElementById("counter-value");
const colorChangeBtn      = document.getElementById("color-change");
const toggleBtn           = document.getElementById("toggle-btn");
const toggleText          = document.getElementById("toggle-text");
const imgSwitches         = document.getElementById("image-switcher");
const imgSwitchBtn        = document.getElementById("img-switch-btn");

const colors = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#F1C40F",
  "#9B59B6",
  "#E67E22",
  "#2ECC71",
  "#1ABC9C",
  "#3498DB",
  "#E74C3C",
];

const img_1 = "assets/pngs/image-1.jpg";
const img_2 = "assets/pngs/image-2.jpg";

let counterValue = 0;
let index = 0;
let isImg1 = true;

incrementBtn.addEventListener("click", () => {
    counterValue++;
    counterValueDisplay.textContent = counterValue;
});


decrementBtn.addEventListener("click", () => {
    if (counterValue > 0){
        counterValue--;
    }
    counterValueDisplay.textContent = counterValue;
});

function getRandomColor() {
  const randomColorIndex = Math.floor(Math.random() * colors.length);
  return colors[randomColorIndex];
}

colorChangeBtn.addEventListener("click", () => {
  document.body.style.backgroundColor = getRandomColor();
});

toggleBtn.addEventListener("click", () => {
    if (toggleText.style.display === "none"){
        toggleText.style.display = "block";
    } else {
        toggleText.style.display = "none";
    }
});

imgSwitchBtn.addEventListener("click", () => {
    if(isImg1){
        imgSwitches.src = img_2;
    } else {
        imgSwitches.src = img_1;
    }
    isImg1 = !isImg1;
});
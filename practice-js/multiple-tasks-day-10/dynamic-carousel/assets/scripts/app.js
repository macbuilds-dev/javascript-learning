const slides = document.querySelectorAll(".carousel img");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const dotsContainer = document.querySelector(".dots");

let index = 0;
let interval = setInterval(nextSlide, 3000);

slides.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  
  if (i === 0) {
    dot.classList.add("active");
  }

  dot.addEventListener("click", () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function showSlide(i) {
  slides.forEach((slide, idx) => {
    slide.classList.toggle("active", idx === i);
    dots[idx].classList.toggle("active", idx === i);
  });
}

function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
}

function goToSlide(i) {
  index = i;
  showSlide(i);
  resetTimer();
}

function resetTimer() {
  clearInterval(interval);
  interval = setInterval(nextSlide, 3000);
}

nextBtn.addEventListener("click", () => {
  nextSlide();
  resetTimer();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  resetTimer();
});

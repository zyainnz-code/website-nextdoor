const slidesEl = document.querySelectorAll(".slidegw");
const dotsContainer = document.getElementById("dotsContainer");
const total = slidesEl.length;
let current = 0;
let autoSlideTimer = null;

// Countdown timer
function updateCountdown() {
  const target = new Date("2026-04-29T11:00:00");
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) {
    document.getElementById("cd-days").textContent = "00";
    document.getElementById("cd-hours").textContent = "00";
    document.getElementById("cd-minutes").textContent = "00";
    document.getElementById("cd-seconds").textContent = "00";
    return;
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("cd-days").textContent    = String(days).padStart(2, "0");
  document.getElementById("cd-hours").textContent   = String(hours).padStart(2, "0");
  document.getElementById("cd-minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("cd-seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Build dots
slidesEl.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => { goToSlide(i); resetTimer(); });
  dotsContainer.appendChild(dot);
});

function updateSlides() {
  slidesEl.forEach((slide, i) => {
    slide.classList.remove("active", "prev", "next", "hidden");
    if (i === current) {
      slide.classList.add("active");
    } else if (i === (current - 1 + total) % total) {
      slide.classList.add("prev");
    } else if (i === (current + 1) % total) {
      slide.classList.add("next");
    } else {
      slide.classList.add("hidden");
    }
  });
  document.querySelectorAll(".dot").forEach((d, i) => {
    d.classList.toggle("active", i === current);
  });
}

function goToSlide(index) {
  current = index;
  updateSlides();
}

function resetTimer() {
  clearInterval(autoSlideTimer);
  autoSlideTimer = setInterval(() => {
    goToSlide((current + 1) % total);
  }, 5000);
}

document.getElementById("arrowLeft").addEventListener("click", () => {
  goToSlide((current - 1 + total) % total);
  resetTimer();
});

document.getElementById("arrowRight").addEventListener("click", () => {
  goToSlide((current + 1) % total);
  resetTimer();
});

// Drag / swipe
const viewport = document.querySelector(".hero-carousel-viewport");
let dragStartX = 0;

viewport.addEventListener("mousedown", (e) => { dragStartX = e.clientX; });
viewport.addEventListener("mouseup", (e) => {
  const diff = dragStartX - e.clientX;
  if (Math.abs(diff) > 50) {
    goToSlide(diff > 0 ? (current + 1) % total : (current - 1 + total) % total);
    resetTimer();
  }
});
viewport.addEventListener("touchstart", (e) => { dragStartX = e.touches[0].clientX; });
viewport.addEventListener("touchend", (e) => {
  const diff = dragStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    goToSlide(diff > 0 ? (current + 1) % total : (current - 1 + total) % total);
    resetTimer();
  }
});

updateSlides();
resetTimer();

// Accordion (unchanged)
function toggleAccordion(header) {
  const item = header.parentElement;
  const isActive = item.classList.contains('active');
  document.querySelectorAll('.accordion-item').forEach(i => {
    i.classList.remove('active');
    i.querySelector('.accordion-arrow').textContent = '▶';
  });
  if (!isActive) {
    item.classList.add('active');
    header.querySelector('.accordion-arrow').textContent = '▼';
  }
}
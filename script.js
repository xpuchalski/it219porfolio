const slides = Array.from(document.querySelectorAll(".slide"));
const dotTrack = document.getElementById("dotTrack");
const currentSlide = document.getElementById("currentSlide");
const totalSlides = document.getElementById("totalSlides");

let activeIndex = 0;
const dots = [];

totalSlides.textContent = String(slides.length).padStart(2, "0");

slides.forEach((slide, index) => {
  const dot = document.createElement("button");
  dot.className = "dot";
  dot.type = "button";
  dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
  dot.addEventListener("click", () => {
    slide.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  dotTrack.appendChild(dot);
  dots.push(dot);
});

function setActive(index) {
  if (index === activeIndex) return;
  activeIndex = index;
  currentSlide.textContent = String(index + 1).padStart(2, "0");

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function updateActiveSlide() {
  const viewportMid = window.scrollY + window.innerHeight * 0.45;
  let nearest = 0;
  let bestDistance = Number.POSITIVE_INFINITY;

  slides.forEach((slide, index) => {
    const top = slide.offsetTop;
    const distance = Math.abs(top - viewportMid);

    if (distance < bestDistance) {
      bestDistance = distance;
      nearest = index;
    }
  });

  setActive(nearest);
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.2,
  }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

window.addEventListener("scroll", updateActiveSlide, { passive: true });
window.addEventListener("resize", updateActiveSlide);
updateActiveSlide();
setActive(0);

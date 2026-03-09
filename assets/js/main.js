const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const revealTargets = document.querySelectorAll(".section:not(.hero)");
const yearNode = document.getElementById("year");
let lastScrollY = window.scrollY;

if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("is-open");
  });

  nav.querySelectorAll("a").forEach((anchor) => {
    anchor.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    });
  });
}

revealTargets.forEach((target) => {
  target.setAttribute("data-reveal", "");
});

const updateScrollDirection = () => {
  const currentScrollY = window.scrollY;
  const direction = currentScrollY > lastScrollY ? "down" : "up";
  document.body.setAttribute("data-scroll-direction", direction);
  lastScrollY = currentScrollY;
};

window.addEventListener("scroll", updateScrollDirection, { passive: true });
updateScrollDirection();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      } else {
        entry.target.classList.remove("is-visible");
      }
    });
  },
  { threshold: 0.22 }
);

revealTargets.forEach((target) => observer.observe(target));

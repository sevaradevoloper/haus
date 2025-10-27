// Navbar scroll blur
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 80) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
});

// Hero image slider
const heroImage = document.getElementById("heroImage");
const bars = document.querySelectorAll(".bar");
const images = [
  "./img/hero.svg",
  "./img/form.svg",
  "./img/boka.svg"
];
let index = 0;
setInterval(() => {
  index = (index + 1) % images.length;
  heroImage.style.backgroundImage = `url('${images[index]}')`;
  // Fixed syntax
  bars.forEach((b, i) => b.classList.toggle("active", i === index));
}, 5000);

// Burger menu
const burger = document.getElementById("burger");
const navLinks = document.querySelector(".header__links"); // Barcha linklarni o'z ichiga olgan asosiy ul

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  navLinks.classList.toggle("menu-open"); // Toggle a class to show/hide menu
});

// **YANGI: Linkni bosganda menyuni yopish**
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    // Agar menyu ochiq bo'lsa, uni yopamiz
    if (navLinks.classList.contains("menu-open")) {
      burger.classList.remove("active");
      navLinks.classList.remove("menu-open");
    }
  });
});
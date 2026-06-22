const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const year = document.querySelector("[data-year]");
const bookingOverlay = document.querySelector("[data-booking-overlay]");
const bookingOpeners = document.querySelectorAll("[data-open-booking]");
const bookingCloser = document.querySelector("[data-close-booking]");

function syncHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
}

function closeNav() {
  nav.classList.remove("is-open");
  header.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
}

year.textContent = new Date().getFullYear();
syncHeader();

window.addEventListener("scroll", syncHeader, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  header.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    closeNav();
  }
});

function openBooking(event) {
  event.preventDefault();
  bookingOverlay.classList.add("is-open");
  bookingOverlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeBooking() {
  bookingOverlay.classList.remove("is-open");
  bookingOverlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

bookingOpeners.forEach((opener) => {
  opener.addEventListener("click", openBooking);
});

bookingCloser.addEventListener("click", closeBooking);

bookingOverlay.addEventListener("click", (event) => {
  if (event.target === bookingOverlay) {
    closeBooking();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeBooking();
  }
});

// Toggle Navigation Menu (for mobile)
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.querySelector("nav ul");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });
}

// Smooth Scrolling for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Filter Projects by Category (add data-category to each project later)
function filterProjects(category) {
  const projects = document.querySelectorAll("#projects article");
  projects.forEach(project => {
    if (category === "all" || project.dataset.category === category) {
      project.style.display = "block";
    } else {
      project.style.display = "none";
    }
  });
}

// Lightbox Effect
const images = document.querySelectorAll("#projects img");
const lightbox = document.createElement("div");
lightbox.id = "lightbox";
document.body.appendChild(lightbox);

images.forEach(img => {
  img.addEventListener("click", () => {
    lightbox.classList.add("active");
    const imgClone = document.createElement("img");
    imgClone.src = img.src;
    lightbox.innerHTML = "";
    lightbox.appendChild(imgClone);
  });
});

lightbox.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

// Form Validation
const form = document.querySelector("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

form.addEventListener("submit", (e) => {
  let hasError = false;

  if (!nameInput.value.trim()) {
    alert("Please enter your name.");
    hasError = true;
  }

  if (!validateEmail(emailInput.value)) {
    alert("Please enter a valid email address.");
    hasError = true;
  }

  if (!messageInput.value.trim()) {
    alert("Please enter your message.");
    hasError = true;
  }

  if (hasError) {
    e.preventDefault();
  }
});

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


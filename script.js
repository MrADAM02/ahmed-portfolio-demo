// DOM Elements
const hamburger = document.createElement('div');
hamburger.className = 'hamburger';
hamburger.innerHTML = '<span></span><span></span><span></span>';
document.querySelector('header').appendChild(hamburger);

const navMenu = document.querySelector('nav ul');
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');
const contactForm = document.getElementById('contact-form');
const projectArticles = document.querySelectorAll('#projects article');

// Toggle mobile menu
function toggleMenu() {
    navMenu.classList.toggle('show');
    hamburger.classList.toggle('active');
}

hamburger.addEventListener('click', toggleMenu);

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            toggleMenu();
        }
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        if (targetId.startsWith('#')) {
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update URL without page jump
            history.pushState(null, null, targetId);
        }
    });
});

// Project filtering functionality
function filterProjects(category) {
    projectArticles.forEach(project => {
        const projectCategories = project.dataset.categories || 'all';
        if (category === 'all' || projectCategories.includes(category)) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}

// Add data-categories to your project articles in HTML
// Example: <article data-categories="web-design javascript">


// Lightbox functionality
function createLightbox() {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="close">&times;</span>
            <img src="" alt="Enlarged view">
            <div class="caption"></div>
        </div>
    `;
    document.body.appendChild(lightbox);
    
    return lightbox;
}

const lightbox = createLightbox();

document.querySelectorAll('#projects img').forEach(img => {
    img.addEventListener('click', () => {
        lightbox.querySelector('img').src = img.src;
        lightbox.querySelector('img').alt = img.alt;
        lightbox.querySelector('.caption').textContent = img.nextElementSibling.textContent;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

lightbox.querySelector('.close').addEventListener('click', () => {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Contact form validation
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let isValid = true;
    
    // Reset error states
    document.querySelectorAll('.error').forEach(el => el.remove());
    
    // Name validation
    if (!name.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
    }
    
    // Email validation
    if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
    }
    
    // Message validation
    if (!message.value.trim()) {
        showError(message, 'Message is required');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError(message, 'Message should be at least 10 characters');
        isValid = false;
    }
    
    if (isValid) {
        // Form is valid - submit data (simulated here)
        simulateFormSubmission();
    }
});

function showError(input, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error';
    errorElement.textContent = message;
    errorElement.style.color = '#e74c3c';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '0.25rem';
    input.parentNode.appendChild(errorElement);
    input.style.borderColor = '#e74c3c';
    
    // Remove error on input
    input.addEventListener('input', function clearError() {
        errorElement.remove();
        input.style.borderColor = '#ddd';
        input.removeEventListener('input', clearError);
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function simulateFormSubmission() {
    const submitButton = contactForm.querySelector('button');
    const originalText = submitButton.textContent;
    
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    submitButton.style.backgroundColor = '#95a5a6';
    
    setTimeout(() => {
        submitButton.textContent = 'Message Sent!';
        submitButton.style.backgroundColor = '#2ecc71';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after delay
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.backgroundColor = '';
            submitButton.disabled = false;
        }, 3000);
    }, 1500);
}

// Scroll animations for sections
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});
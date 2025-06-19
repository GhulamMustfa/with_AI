// Theme Switcher
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'dark';
}

// Theme toggle event
themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

// Additional Skills Modal
const moreButtons = document.querySelectorAll('.more-btn');
const skillDetails = document.querySelectorAll('.skill-details');

moreButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // Close all other modals
        skillDetails.forEach((detail, i) => {
            if (i !== index) {
                detail.classList.remove('active');
            }
        });
        // Toggle current modal
        skillDetails[index].classList.toggle('active');
    });
});

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.more-btn') && !e.target.closest('.skill-details')) {
        skillDetails.forEach(detail => {
            detail.classList.remove('active');
        });
    }
});

// Mobile Menu Toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');
const dropdowns = document.querySelectorAll('.dropdown');

if (hamburger) {
    // Toggle mobile menu
    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        navToggle.checked = !navToggle.checked;
    });
}

// Handle dropdowns in mobile view
dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.dropdown-trigger');
    trigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-links') && !e.target.closest('.hamburger')) {
        navToggle.checked = false;
        dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
    }
});

// Prevent menu from closing when clicking inside
navLinks.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navToggle.checked = false;
        dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
    }
});

// Animate skill progress bars
const progressBars = document.querySelectorAll('.progress-bar');

const animateProgressBars = () => {
    progressBars.forEach(bar => {
        const progress = bar.parentElement.getAttribute('data-progress');
        bar.style.width = `${progress}%`;
    });
};

// Animate on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-category').forEach(category => {
    observer.observe(category);
});

// Smooth Scrolling
document.querySelectorAll('.smooth-scroll').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}); 
/**
 * Animation Controller for Shalini Devi Health Products
 * Handles scroll reveals and common UI transitions
 */

// Global reveal observer instance
let revealObserver;

function initScrollReveal() {
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    };

    if (!revealObserver) {
        revealObserver = new IntersectionObserver(revealCallback, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
    }

    // Elements to reveal - specifically targeting those not already revealed
    const revealTargets = document.querySelectorAll('.section-header:not(.revealed), .product-card:not(.revealed), .category-card:not(.revealed), .testimonial-card:not(.revealed), .feature-item:not(.revealed), .hero-content:not(.revealed), header h1:not(.revealed), header p:not(.revealed)');
    
    revealTargets.forEach(target => {
        target.classList.add('reveal');
        revealObserver.observe(target);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Reveal on Scroll
    initScrollReveal();

    // 2. Add organic classes to sections
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        if (index % 2 !== 0) {
            section.classList.add('bg-organic');
        }
    });

    // 3. Navbar Scrolled State
    const mainNav = document.querySelector('nav');
    if (mainNav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                mainNav.classList.add('scrolled');
            } else {
                mainNav.classList.remove('scrolled');
            }
        });
    }

    // 4. Active Link Detection
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath.endsWith(href) || (currentPath === '/' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 5. Add paper texture to all product cards
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        card.classList.add('paper-texture');
    });
});

// Expose to window for dynamic content
window.initScrollReveal = initScrollReveal;

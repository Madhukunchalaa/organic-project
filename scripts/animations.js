/**
 * Animation Controller for Shalini Devi Health Products
 * Handles scroll reveals and common UI transitions
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Reveal on Scroll
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Once revealed, we don't need to observe it anymore
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    // Elements to reveal
    const revealTargets = document.querySelectorAll('.section-header, .product-card, .category-card, .feature-item, header h1, header p');
    revealTargets.forEach(target => {
        target.classList.add('reveal');
        revealObserver.observe(target);
    });

    // 2. Add organic classes to sections
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        if (index % 2 !== 0) {
            section.classList.add('bg-organic');
        }
    });

    // 3. Add paper texture to all product cards
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        card.classList.add('paper-texture');
    });
});

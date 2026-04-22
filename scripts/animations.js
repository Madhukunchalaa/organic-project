/**
 * Premium Animation Controller for Shalini Devi Health Products
 */

let revealObserver;

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize Reveal on Scroll
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: Stop observing once revealed for better performance, 
                // but keeping it means we could replay if needed. We'll unobserve.
                observer.unobserve(entry.target);
            }
        });
    };

    revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const revealTargets = document.querySelectorAll('.reveal');
    revealTargets.forEach(target => {
        revealObserver.observe(target);
    });

    // 2. Navbar Scroll Effect
    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            nav.style.background = 'rgba(250, 248, 243, 0.95)';
            nav.style.boxShadow = 'var(--shadow-sm)';
            if(document.body.classList.contains('dark')){
                nav.style.background = 'rgba(20, 26, 13, 0.98)';
                nav.style.borderBottom = '1px solid rgba(127,178,58,0.2)';
            }
        } else {
            nav.style.background = 'rgba(250, 248, 243, 0.85)';
            nav.style.boxShadow = 'none';
             if(document.body.classList.contains('dark')){
                nav.style.background = 'rgba(20, 26, 13, 0.85)';
                nav.style.borderBottom = '1px solid var(--border-light)';
            }
        }
    }, {passive: true});

    // 3. Scroll to Top Button
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }, {passive: true});
    }

    // 4. Input interactions
    document.querySelectorAll('input, select, textarea').forEach(el => {
        el.addEventListener('focus', () => {
            el.parentElement.classList.add('focused');
        });
        el.addEventListener('blur', () => {
            el.parentElement.classList.remove('focused');
        });
    });
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

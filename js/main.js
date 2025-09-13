document.addEventListener('DOMContentLoaded', function() {
    
    // --- Mobiel Menu Toggle ---
    const navToggle = document.querySelector('.nav-toggle');
    const body = document.body;

    navToggle.addEventListener('click', () => {
        body.classList.toggle('nav-open');
    });

    // --- Fade-in Animatie bij Scrollen ---
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null, // Gebruikt de viewport
        rootMargin: '0px',
        threshold: 0.1 // Activeer als 10% van het element zichtbaar is
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optioneel: stop met observeren na de eerste keer voor betere performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // --- Sluit mobiel menu bij klikken op een link ---
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (body.classList.contains('nav-open')) {
                body.classList.remove('nav-open');
            }
        });
    });

});
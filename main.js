document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    setupScrollLinks();
    observeAos(document.querySelectorAll('[data-aos]'));
    renderPortfolio();
});

function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

function setupScrollLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', event => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();
            const headerHeight = document.querySelector('.main-header')?.offsetHeight || 70;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        });
    });
}

function observeAos(elements) {
    if (!elements.length) return;

    const animate = element => {
        element.classList.add('aos-animate');
        const delay = Number.parseInt(element.dataset.aosDelay || '0', 10);
        if (delay > 0) element.style.transitionDelay = `${delay}ms`;
        element.style.transitionDuration = '0.8s';
    };

    if (!('IntersectionObserver' in window)) {
        elements.forEach(animate);
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            animate(entry.target);
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(element => observer.observe(element));
}

function renderPortfolio() {
    const portfolioGrid = document.getElementById('portfolio-grid');
    if (!portfolioGrid) return;

    portfolioGrid.querySelectorAll('.portfolio-card').forEach((card, index) => {
        card.dataset.aos = 'fade-up';
        card.dataset.aosDelay = String((index + 1) * 100);
    });

    observeAos(portfolioGrid.querySelectorAll('[data-aos]'));
}

/**
 * CYBERSECURITY PORTFOLIO - Enhanced JavaScript
 * Author: Umanga Bidari
 * Features: Matrix rain, typewriter, counters, dark mode, form handling
 */

// ==============================================
// GLOBAL VARIABLES & CONFIGURATION
// ==============================================

const CONFIG = {
    matrix: {
        chars: '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
        size: 16,
        speed: 50,
        fadeFactor: 0.05
    },
    typing: {
        phrases: [
            'Ethical Hacker',
            'Security Analyst', 
            'Penetration Tester',
            'Vulnerability Researcher',
            'Cybersecurity Enthusiast'
        ],
        typeSpeed: 100,
        deleteSpeed: 50,
        pauseTime: 2000
    },
    counter: {
        duration: 2000,
        ease: 'easeOutExpo'
    }
};

// DOM Elements Cache
const elements = {
    navbar: document.querySelector('.navbar'),
    hamburger: document.querySelector('.hamburger'),
    navMenu: document.querySelector('.nav-menu'),
    themeToggle: document.querySelector('.theme-toggle'),
    contactForm: document.getElementById('contactForm'),
    newsletterForm: document.getElementById('newsletterForm'),
    typingText: document.getElementById('typing-text'),
    statNumbers: document.querySelectorAll('.stat-number[data-count]'),
    matrixCanvas: document.getElementById('matrix-bg'),
    scrollTopBtn: null
};

// State
let state = {
    darkMode: true,
    typingPhraseIndex: 0,
    typingCharIndex: 0,
    isDeleting: false,
    scrollY: 0
};

// ==============================================
// MATRIX RAIN BACKGROUND
// ==============================================

class MatrixRain {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.drops = [];
        this.fontSize = CONFIG.matrix.size;
        this.columns = 0;
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
    }

    draw() {
        this.ctx.fillStyle = `rgba(10, 14, 39, ${CONFIG.matrix.fadeFactor})`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#0f0';
        this.ctx.font = `${this.fontSize}px monospace`;

        for (let i = 0; i < this.drops.length; i++) {
            const char = CONFIG.matrix.chars[Math.floor(Math.random() * CONFIG.matrix.chars.length)];
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;

            this.ctx.fillStyle = this.getRandomColor();
            this.ctx.fillText(char, x, y);

            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
    }

    getRandomColor() {
        const colors = [
            `rgba(0, 212, 255, ${Math.random() * 0.5 + 0.5})`,
            `rgba(0, 255, 136, ${Math.random() * 0.5 + 0.5})`,
            `rgba(157, 78, 221, ${Math.random() * 0.5 + 0.5})`,
            '#0f0',
            '#fff'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animate() {
        this.draw();
        setTimeout(() => requestAnimationFrame(() => this.animate()), CONFIG.matrix.speed);
    }
}

// ==============================================
// TYPING EFFECT
// ==============================================

class TypeWriter {
    constructor(element, phrases, options = {}) {
        this.element = element;
        this.phrases = phrases;
        this.typeSpeed = options.typeSpeed || 100;
        this.deleteSpeed = options.deleteSpeed || 50;
        this.pauseTime = options.pauseTime || 2000;
        this.phraseIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.type();
    }

    type() {
        const currentPhrase = this.phrases[this.phraseIndex];

        if (this.isDeleting) {
            this.charIndex--;
            this.element.textContent = currentPhrase.substring(0, this.charIndex);
        } else {
            this.charIndex++;
            this.element.textContent = currentPhrase.substring(0, this.charIndex);
        }

        let typeSpeed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

        if (!this.isDeleting && this.charIndex === currentPhrase.length) {
            typeSpeed = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// ==============================================
// COUNTER ANIMATION
// ==============================================

class CounterAnimation {
    constructor(element, duration = 2000) {
        this.element = element;
        this.target = parseInt(element.getAttribute('data-count'));
        this.duration = duration;
        this.startTime = null;
        this.observer = null;
        this.init();
    }

    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animate();
                    this.observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        this.observer.observe(this.element);
    }

    easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    animate() {
        this.startTime = performance.now();
        const update = (currentTime) => {
            const elapsed = currentTime - this.startTime;
            const progress = Math.min(elapsed / this.duration, 1);
            const easedProgress = this.easeOutExpo(progress);
            const current = Math.floor(easedProgress * this.target);
            this.element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                this.element.textContent = this.target;
            }
        };
        requestAnimationFrame(update);
    }
}

// ==============================================
// THEME TOGGLE
// ==============================================

class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'dark';
        this.icon = elements.themeToggle.querySelector('i');
        this.init();
    }

    init() {
        this.applyTheme(this.theme);
        elements.themeToggle.addEventListener('click', () => this.toggle());
    }

    applyTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (theme === 'dark') {
            this.icon.className = 'fas fa-moon';
        } else {
            this.icon.className = 'fas fa-sun';
        }
    }

    toggle() {
        const newTheme = this.theme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
    }
}

// ==============================================
// FORM HANDLING
// ==============================================

class FormHandler {
    constructor(form, type) {
        this.form = form;
        this.type = type; // 'contact' or 'newsletter'
        this.statusEl = this.form.querySelector('.form-status');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.form.addEventListener('reset', () => this.clearStatus());
        this.addInputValidation();
    }

    addInputValidation() {
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }

    validateField(input) {
        const value = input.value.trim();
        const errorEl = input.parentElement.querySelector('.error-message') || 
                       input.nextElementSibling;
        
        if (!errorEl) return;

        if (input.hasAttribute('required') && !value) {
            errorEl.textContent = 'This field is required';
            input.style.borderColor = 'var(--cyber-red)';
            return false;
        }

        if (input.type === 'email' && value && !this.isValidEmail(value)) {
            errorEl.textContent = 'Please enter a valid email';
            input.style.borderColor = 'var(--cyber-red)';
            return false;
        }

        errorEl.textContent = '';
        input.style.borderColor = '';
        return true;
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    showSuccess(message) {
        this.statusEl.textContent = message;
        this.statusEl.className = 'form-status success';
        setTimeout(() => this.clearStatus(), 5000);
    }

    showError(message) {
        this.statusEl.textContent = message;
        this.statusEl.className = 'form-status error';
    }

    clearStatus() {
        this.statusEl.textContent = '';
        this.statusEl.className = 'form-status';
    }

    clearError(input) {
        const errorEl = input.parentElement.querySelector('.error-message');
        if (errorEl) {
            errorEl.textContent = '';
            input.style.borderColor = '';
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        const inputs = this.form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            this.showError('Please fix the errors above.');
            return;
        }

        // Get form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());

        // Simulate form submission (replace with actual backend)
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            // Simulate API call
            await this.simulateSubmission(data);
            this.form.reset();
            this.showSuccess(this.type === 'contact' 
                ? `Thank you ${data.name}! Your message has been sent successfully. I'll get back to you soon!`
                : 'Thank you for subscribing! Check your email for confirmation.');
        } catch (error) {
            this.showError('Failed to send. Please try again or email me directly.');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    simulateSubmission(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('Form submitted:', data);
                resolve({ success: true });
            }, 1500);
        });
    }
}

// ==============================================
// SCROLL HANDLING & NAVBAR
// ==============================================

class ScrollHandler {
    constructor() {
        this.threshold = 100;
        this.init();
    }

    init() {
        this.handleScroll();
        window.addEventListener('scroll', () => this.handleScroll());
        this.setupSmoothScroll();
        this.setupActiveNavLink();
        this.createScrollToTop();
    }

    handleScroll() {
        state.scrollY = window.pageYOffset;
        
        // Navbar style change on scroll
        if (state.scrollY > this.threshold) {
            elements.navbar.classList.add('scrolled');
        } else {
            elements.navbar.classList.remove('scrolled');
        }
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    // Close mobile menu if open
                    if (elements.navMenu && elements.navMenu.classList.contains('active')) {
                        elements.navMenu.classList.remove('active');
                        elements.hamburger?.classList.remove('active');
                    }
                    
                    const offset = 80;
                    const targetPosition = target.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL
                    history.pushState(null, null, href);
                    
                    // Focus target for accessibility
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                }
            });
        });
    }

    setupActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { threshold: 0.2, rootMargin: '-80px 0px -80% 0px' });

        sections.forEach(section => observer.observe(section));
    }

    createScrollToTop() {
        const btn = document.createElement('button');
        btn.className = 'scroll-top-btn';
        btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        btn.setAttribute('aria-label', 'Scroll to top');
        btn.setAttribute('title', 'Back to top');
        
        // Inline styles (could be moved to CSS)
        Object.assign(btn.style, {
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '50px',
            height: '50px',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            color: 'var(--dark-bg)',
            border: 'none',
            borderRadius: '50%',
            fontSize: '1.2rem',
            cursor: 'pointer',
            display: 'none',
            zIndex: '9999',
            transition: 'all 0.3s ease',
            boxShadow: '0 5px 20px rgba(0, 212, 255, 0.3)',
            opacity: '0.9'
        });

        document.body.appendChild(btn);
        elements.scrollTopBtn = btn;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                btn.style.display = 'flex';
                btn.style.opacity = '1';
            } else {
                btn.style.display = 'none';
                btn.style.opacity = '0';
            }
        });

        btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.1) rotate(5deg)';
            btn.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.5)';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1) rotate(0deg)';
            btn.style.boxShadow = '0 5px 20px rgba(0, 212, 255, 0.3)';
        });
    }
}

// ==============================================
// MOBILE MENU
// ==============================================

class MobileMenu {
    constructor() {
        this.hamburger = elements.hamburger;
        this.menu = elements.navMenu;
        if (!this.hamburger || !this.menu) return;
        this.init();
    }

    init() {
        this.hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (this.menu.classList.contains('active') && 
                !this.menu.contains(e.target) && 
                !this.hamburger.contains(e.target)) {
                this.close();
            }
        });

        // Keyboard support
        this.hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggle();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.menu.classList.contains('active')) {
                this.close();
                this.hamburger.focus();
            }
        });
    }

    toggle() {
        const isOpen = this.menu.classList.toggle('active');
        this.hamburger.classList.toggle('active');
        this.hamburger.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    close() {
        this.menu.classList.remove('active');
        this.hamburger.classList.remove('active');
        this.hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
}

// ==============================================
// SCROLL ANIMATIONS (Intersection Observer)
// ==============================================

class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll(
            '.project-card, .blog-card, .testimonial-card, ' +
            '.skill-category, .timeline-content, .info-card, .hero-stat'
        );
        this.init();
    }

    init() {
        this.elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.elements.forEach(el => observer.observe(el));
    }
}

// ==============================================
// LAZY LOADING IMAGES
// ==============================================

class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img[loading="lazy"]');
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });

            this.images.forEach(img => imageObserver.observe(img));
        }
    }
}

// ==============================================
// PARALLAX EFFECT
// ==============================================

class ParallaxEffect {
    constructor() {
        this.hero = document.querySelector('.hero');
        if (!this.hero) return;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            this.hero.style.backgroundPositionY = `${rate}px`;
        });
    }
}

// ==============================================
// INITIALIZATION
// ==============================================

function initApp() {
    // Initialize Matrix Rain
    if (elements.matrixCanvas) {
        new MatrixRain(elements.matrixCanvas);
    }

    // Initialize TypeWriter
    if (elements.typingText) {
        new TypeWriter(elements.typingText, CONFIG.typing.phrases, {
            typeSpeed: CONFIG.typing.typeSpeed,
            deleteSpeed: CONFIG.typing.deleteSpeed,
            pauseTime: CONFIG.typing.pauseTime
        });
    }

    // Initialize Counters
    elements.statNumbers.forEach(el => {
        new CounterAnimation(el, CONFIG.counter.duration);
    });

    // Initialize Theme Manager
    if (elements.themeToggle) {
        new ThemeManager();
    }

    // Initialize Forms
    if (elements.contactForm) {
        new FormHandler(elements.contactForm, 'contact');
    }

    if (elements.newsletterForm) {
        new FormHandler(elements.newsletterForm, 'newsletter');
    }

    // Initialize Mobile Menu
    new MobileMenu();

    // Initialize Scroll Handler
    new ScrollHandler();

    // Initialize Scroll Animations
    new ScrollAnimations();

    // Initialize Lazy Loading
    new LazyLoader();

    // Initialize Parallax
    new ParallaxEffect();

    // Console Easter Egg
    console.log('%c🔐 Umanga Bidari - Cybersecurity Portfolio', 'color: #00d4ff; font-size: 16px; font-weight: bold;');
    console.log('%cInterested in cybersecurity? Let\'s connect!', 'color: #00ff88; font-size: 12px;');
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Export for testing/debugging
window.portfolio = {
    MatrixRain,
    TypeWriter,
    CounterAnimation,
    ThemeManager,
    FormHandler,
    MobileMenu,
    ScrollHandler,
    ScrollAnimations,
    LazyLoader,
    ParallaxEffect,
    config: CONFIG,
    state
};

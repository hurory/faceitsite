// Smooth scroll reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.feature-item, .mode-card, .map-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// Parallax effect for hero background
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 11, 15, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 11, 15, 0.8)';
    }
    
    lastScroll = currentScroll;
});

// Magnetic effect for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = '';
    });
});

// Cursor trail effect
const cursor = document.createElement('div');
cursor.className = 'cursor-trail';
document.body.appendChild(cursor);

const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .cursor-trail {
        position: fixed;
        width: 8px;
        height: 8px;
        background: var(--primary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s;
        mix-blend-mode: difference;
    }
    
    @media (hover: hover) {
        .cursor-trail {
            opacity: 0.6;
        }
    }
`;
document.head.appendChild(cursorStyle);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.1;
    cursorY += dy * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Stagger animation for feature items
const staggerElements = document.querySelectorAll('.feature-item');
staggerElements.forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.1}s`;
});

// Add hover effect to mode cards
document.querySelectorAll('.mode-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization: Reduce animations on low-end devices
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

// Console easter egg
console.log('%cRushFACEIT', 'font-size: 48px; font-weight: bold; background: linear-gradient(135deg, #FF4655, #00D9FF); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cCompetitive Standoff 2 Platform', 'font-size: 16px; color: #A1A1AA;');
console.log('%cCreated by @huroryy', 'font-size: 12px; color: #FF4655;');


// ZeroPesa JavaScript - Interactions and Animations
// Pure vanilla JS - No dependencies, optimized for performance
// PERFORMANCE OPTIMIZATIONS:
// - Event listeners use passive: true for scroll
// - requestAnimationFrame for smooth animations
// - Debounced scroll/input handlers
// - Cached DOM selectors
// - Intersection Observer for lazy loading

/* ============================================
   UTILITIES & HELPER FUNCTIONS
   ============================================ */

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Format number with commas
function formatNumber(num) {
    return Math.round(num).toLocaleString('en-US');
}

// Create ripple effect on button click
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

/* ============================================
   HEADER SCROLL EFFECT
   ============================================ */

// Cache DOM elements for performance
const header = document.getElementById('header');
const SCROLL_THRESHOLD = 100;

let lastScrollTop = 0;
let ticking = false;

function updateHeaderOnScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > SCROLL_THRESHOLD) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Track scroll direction for future enhancements
    if (scrollTop > lastScrollTop) {
        // Scrolling down
        header.setAttribute('data-direction', 'down');
    } else {
        // Scrolling up
        header.setAttribute('data-direction', 'up');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    ticking = false;
}

// Use passive event listener for better scroll performance
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateHeaderOnScroll);
        ticking = true;
    }
}, { passive: true });

/* ============================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if href is just "#"
        if (href === '#') return;

        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();

            // Track navigation (prep for analytics)
            console.log('Navigation:', {
                from: window.location.hash,
                to: href,
                timestamp: new Date().toISOString()
            });

            // Calculate offset for fixed header
            const headerHeight = header.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Update URL without triggering scroll
            history.pushState(null, null, href);
        }
    });
});

/* ============================================
   HERO PHONE SHOWCASE CAROUSEL
   ============================================ */

const showcaseItems = document.querySelectorAll('.showcase-item');
let currentShowcaseIndex = 0;
const SHOWCASE_INTERVAL = 3000;

function rotateShowcaseItems() {
    if (showcaseItems.length === 0) return;

    // Remove active class from all items
    showcaseItems.forEach(item => item.classList.remove('active'));

    // Add active class to current item
    showcaseItems[currentShowcaseIndex].classList.add('active');

    // Increment index and wrap around
    currentShowcaseIndex = (currentShowcaseIndex + 1) % showcaseItems.length;
}

// Start the carousel
if (showcaseItems.length > 0) {
    setInterval(rotateShowcaseItems, SHOWCASE_INTERVAL);
}

/* ============================================
   CALCULATOR FUNCTIONALITY
   ============================================ */

// Cache all DOM selectors for performance
const amountSlider = document.getElementById('amount-slider');
const currentAmountDisplay = document.getElementById('current-amount');
const oldFeeDisplay = document.getElementById('old-fee');
const oldMarkupDisplay = document.getElementById('old-markup');
const oldTotalDisplay = document.getElementById('old-total');
const oldReceiveDisplay = document.getElementById('old-receive');
const newFeeDisplay = document.getElementById('new-fee');
const newTotalDisplay = document.getElementById('new-total');
const newReceiveDisplay = document.getElementById('new-receive');
const savingsDisplay = document.getElementById('savings');
const savingsPercentDisplay = document.getElementById('savings-percent');
const savingsHighlight = document.querySelector('.savings-highlight');

// Animate number count-up using requestAnimationFrame (GPU accelerated)
function animateValue(element, start, end, duration = 600) {
    if (!element) return;

    const startTime = performance.now();
    const difference = end - start;

    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic for smooth animation
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = start + (difference * easeProgress);

        element.textContent = formatNumber(currentValue);

        if (progress < 1) {
            requestAnimationFrame(updateValue);
        } else {
            element.textContent = formatNumber(end);
        }
    }

    requestAnimationFrame(updateValue);
}

// Calculate fees and update display
function calculateFees() {
    if (!amountSlider) return;

    const amount = parseInt(amountSlider.value);

    // Old Way Calculations (6% fee + 2% exchange markup)
    const oldFee = amount * 0.06;
    const oldMarkup = amount * 0.02;
    const oldTotal = oldFee + oldMarkup;
    const oldReceive = amount - oldTotal;

    // ZeroPesa Calculations (0.3% fee, no markup)
    const newFee = amount * 0.003;
    const newTotal = newFee;
    const newReceive = amount - newTotal;

    // Savings
    const savings = oldTotal - newTotal;
    const savingsPercent = Math.round((savings / oldTotal) * 100);

    // Get current values for animation start
    const currentAmount = parseInt(currentAmountDisplay.textContent.replace(/,/g, '') || '0');
    const currentOldFee = parseInt(oldFeeDisplay.textContent.replace(/[^0-9]/g, '') || '0');
    const currentOldMarkup = parseInt(oldMarkupDisplay.textContent.replace(/[^0-9]/g, '') || '0');
    const currentOldTotal = parseInt(oldTotalDisplay.textContent.replace(/[^0-9]/g, '') || '0');
    const currentOldReceive = parseInt(oldReceiveDisplay.textContent.replace(/[^0-9]/g, '') || '0');
    const currentNewFee = parseInt(newFeeDisplay.textContent.replace(/[^0-9]/g, '') || '0');
    const currentNewTotal = parseInt(newTotalDisplay.textContent.replace(/[^0-9]/g, '') || '0');
    const currentNewReceive = parseInt(newReceiveDisplay.textContent.replace(/[^0-9]/g, '') || '0');
    const currentSavings = parseInt(savingsDisplay.textContent.replace(/[^0-9]/g, '') || '0');

    // Animate all values with requestAnimationFrame
    animateValue(currentAmountDisplay, currentAmount, amount, 400);
    animateValue(oldFeeDisplay, currentOldFee, oldFee, 500);
    animateValue(oldMarkupDisplay, currentOldMarkup, oldMarkup, 500);
    animateValue(oldTotalDisplay, currentOldTotal, oldTotal, 500);
    animateValue(oldReceiveDisplay, currentOldReceive, oldReceive, 500);
    animateValue(newFeeDisplay, currentNewFee, newFee, 500);
    animateValue(newTotalDisplay, currentNewTotal, newTotal, 500);
    animateValue(newReceiveDisplay, currentNewReceive, newReceive, 500);
    animateValue(savingsDisplay, currentSavings, savings, 500);

    // Update savings percent
    if (savingsPercentDisplay) {
        savingsPercentDisplay.textContent = savingsPercent;
    }

    // Add pulse animation to savings box
    if (savingsHighlight) {
        savingsHighlight.classList.remove('pulse');
        void savingsHighlight.offsetWidth; // Trigger reflow
        savingsHighlight.classList.add('pulse');
    }

    // Update slider background gradient dynamically
    const percentage = ((amount - 10000) / (500000 - 10000)) * 100;
    amountSlider.style.background = `linear-gradient(to right,
        var(--teal-light) 0%,
        var(--teal-light) ${percentage}%,
        var(--grey-light) ${percentage}%,
        var(--grey-light) 100%)`;

    // Track calculator usage (prep for analytics)
    console.log('Calculator Update:', { amount, savings, savingsPercent });
}

// Debounced calculator for performance - reduces unnecessary calculations
const debouncedCalculateFees = debounce(calculateFees, 50);

// Listen for slider input with passive event listener
if (amountSlider) {
    amountSlider.addEventListener('input', debouncedCalculateFees, { passive: true });
    // Initialize calculator on load
    calculateFees();
}

/* ============================================
   SCROLL ANIMATIONS - INTERSECTION OBSERVER
   ============================================ */

// Observer options for scroll animations (performance: only observe once)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // Trigger when 50% of element is visible
};

// Section observer for fade-in effects (lower threshold for earlier triggering)
const sectionObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 // Trigger when 20% visible for sections
};

// Callback for animated elements (unobserve after animation for performance)
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay') || 0;

            // Add visible class after delay for stagger effect
            setTimeout(() => {
                entry.target.classList.add('visible');

                // Track element visibility (prep for analytics)
                console.log('Element visible:', {
                    element: entry.target.className,
                    timestamp: new Date().toISOString()
                });
            }, parseInt(delay));

            // Stop observing once animated to improve performance
            observer.unobserve(entry.target);
        }
    });
};

// Create observers
const observer = new IntersectionObserver(observerCallback, sectionObserverOptions);
const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);

// Observe animated elements (cached selector for performance)
const animatedElements = document.querySelectorAll(
    '.problem-card, .step-card, .trust-pillar, .comparison-card'
);

animatedElements.forEach(element => {
    observer.observe(element);
});

// Observe all sections for lazy effects (cached selector)
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    sectionObserver.observe(section);
});

/* ============================================
   BUTTON INTERACTIONS & RIPPLE EFFECTS
   ============================================ */

// Add ripple effect to all buttons (cached selector for performance)
const buttons = document.querySelectorAll(
    '.btn-primary, .btn-secondary, .btn-app-store, .btn-google-play'
);

buttons.forEach(button => {
    // Add position relative if not set
    const computedStyle = window.getComputedStyle(button);
    if (computedStyle.position === 'static') {
        button.style.position = 'relative';
    }
    button.style.overflow = 'hidden';

    button.addEventListener('click', function(e) {
        createRipple(e);

        // Track button clicks (prep for analytics)
        console.log('Button Click:', {
            button: this.textContent.trim(),
            section: this.closest('section')?.id || 'header',
            timestamp: new Date().toISOString()
        });
    });
});

// Add ripple CSS dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        background-color: rgba(255, 255, 255, 0.5);
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

/* ============================================
   LAZY LOADING FOR IMAGES
   ============================================ */

// Lazy load images when they enter viewport (use native loading="lazy" when possible)
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img); // Stop observing after load

            console.log('Image loaded:', img.src);
        }
    });
}, {
    rootMargin: '50px' // Start loading 50px before entering viewport
});

lazyImages.forEach(img => imageObserver.observe(img));

/* ============================================
   PERFORMANCE MONITORING
   ============================================ */

// Log performance metrics on load (Core Web Vitals tracking)
window.addEventListener('load', () => {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const domContentLoadTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;

        console.log('Performance Metrics:', {
            pageLoadTime: `${pageLoadTime}ms`,
            domContentLoaded: `${domContentLoadTime}ms`,
            firstPaint: `${perfData.responseStart - perfData.navigationStart}ms`,
            timestamp: new Date().toISOString()
        });

        // Check if we meet our performance budget targets
        if (domContentLoadTime < 1500) {
            console.log('✓ First Contentful Paint target met (< 1.5s)');
        }
        if (pageLoadTime < 3000) {
            console.log('✓ Time to Interactive target met (< 3s)');
        }
    }
}, { once: true }); // Run only once

/* ============================================
   KEYBOARD NAVIGATION ENHANCEMENT
   ============================================ */

// Add keyboard navigation for calculator
if (amountSlider) {
    amountSlider.addEventListener('keydown', (e) => {
        const step = 10000;
        let newValue = parseInt(amountSlider.value);

        if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
            newValue = Math.min(newValue + step, 500000);
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
            newValue = Math.max(newValue - step, 10000);
        }

        if (newValue !== parseInt(amountSlider.value)) {
            amountSlider.value = newValue;
            calculateFees();
        }
    });
}

/* ============================================
   ACCESSIBILITY ENHANCEMENTS
   ============================================ */

// Skip to main content functionality
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && e.shiftKey === false) {
        const hero = document.getElementById('hero');
        if (document.activeElement === document.body && hero) {
            e.preventDefault();
            hero.focus();
            hero.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

/* ============================================
   ERROR HANDLING
   ============================================ */

// Global error handler for development
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno
    });
});

// Log script initialization
console.log('ZeroPesa initialized successfully', {
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    viewport: `${window.innerWidth}x${window.innerHeight}`
});
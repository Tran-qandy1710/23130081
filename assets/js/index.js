const sliderContainer = document.querySelector('.slider-container');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.nav-dot');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentSlide = 0;
let autoSlideInterval;

function updateSlider() {
    sliderContainer.style.transform = `translateX(-${currentSlide * 20}%)`;

    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');

    // Reset and start animations for current slide content
    const currentContent = slides[currentSlide].querySelector('.slide-content');
    const h2 = currentContent.querySelector('h2');
    const p = currentContent.querySelector('p');

    h2.style.animation = 'none';
    p.style.animation = 'none';

    // Trigger reflow
    h2.offsetHeight;
    p.offsetHeight;

    h2.style.animation = 'fadeIn 0.8s ease-out forwards';
    p.style.animation = 'fadeIn 0.8s ease-out 0.3s forwards';
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
}

// Add click events for dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
        resetAutoSlide();
    });
});

// Add click events for arrows
prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});

// Auto slide function
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Start auto sliding
startAutoSlide();

// Pause auto slide on hover
sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
sliderContainer.addEventListener('mouseleave', startAutoSlide);

// Handle swipe events for mobile
let touchStartX = 0;
let touchEndX = 0;

sliderContainer.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

sliderContainer.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 30;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
        resetAutoSlide();
    }
}

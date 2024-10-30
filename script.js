let currentSlide = 1;
let totalSlides;
let autoSlideTimer;
const slideDuration = 5000;
let progressBarActive = false;

AOS.init();

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    slides[currentSlide - 1].classList.remove('active');
    currentSlide++;
    if (currentSlide > totalSlides) {
        currentSlide = 1;
    }
    slides[currentSlide - 1].classList.add('active');
    resetProgressBar();
}

function prevSlide() {
    const slides = document.querySelectorAll('.slide');
    slides[currentSlide - 1].classList.remove('active');
    currentSlide--;
    if (currentSlide < 1) {
        currentSlide = totalSlides;
    }
    slides[currentSlide - 1].classList.add('active');
    resetProgressBar();
}

function restartSlides() {
    const slides = document.querySelectorAll('.slide');
    slides[currentSlide - 1].classList.remove('active');
    currentSlide = 1;
    slides[currentSlide - 1].classList.add('active');
    resetProgressBar();
    autoSlide();
}

function autoSlide() {
    clearTimeout(autoSlideTimer);
    autoSlideTimer = setTimeout(() => {
        if (!progressBarActive) {
            nextSlide();
        }
        autoSlide();
    }, slideDuration);
}

function resetProgressBar() {
    const progressBar = document.querySelector('#progress-bar');
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
    setTimeout(() => {
        progressBar.style.transition = `width ${slideDuration}ms linear`;
        progressBar.style.width = '100%';
    }, 100);
}

function stopProgressBar() {
    const progressBar = document.querySelector('#progress-bar');
    progressBar.style.transition = 'none';
    progressBar.style.width = `${(currentSlide / totalSlides) * 100}%`;
}

function handleMouseDown() {
    progressBarActive = true;
    stopProgressBar();
}

function handleMouseUp() {
    progressBarActive = false;
    resetProgressBar();
}

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    totalSlides = slides.length;
    slides[0].classList.add('active');
    autoSlide();
    resetProgressBar();

    const progressBarContainer = document.querySelector('#progress-bar-container');
    progressBarContainer.addEventListener('mousedown', handleMouseDown);
    progressBarContainer.addEventListener('mouseup', handleMouseUp);
    progressBarContainer.addEventListener('touchstart', handleMouseDown);
    progressBarContainer.addEventListener('touchend', handleMouseUp);
});

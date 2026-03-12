// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);

    // Initialize particles and petals after loading
    createParticles();
    createPetals();
});

// Welcome Screen Logic
const welcomeScreen = document.getElementById('welcome-screen');
const enterBtn = document.getElementById('enter-btn');

if (enterBtn && welcomeScreen) {
    enterBtn.addEventListener('click', () => {
        welcomeScreen.classList.add('hidden');
        
        // Start background music
        if(!isPlaying) {
            bgMusic.play().then(() => {
                isPlaying = true;
                musicBtn.classList.add('playing');
                musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            }).catch(err => console.log('Autoplay prevented:', err));
        }
    });
}

// Floating global flower petals
function createPetals() {
    const petalsContainer = document.createElement('div');
    petalsContainer.className = 'petals-container';
    document.body.appendChild(petalsContainer);
    
    // Create petals
    const petalCount = 45;
    const petalColors = ['#f48fb1', '#fce4ec', '#f8bbd0', '#ffd5e5', '#fff0f5'];
    
    for (let i = 0; i < petalCount; i++) {
        let petal = document.createElement('div');
        petal.className = 'petal';
        
        // Random properties
        let size = Math.random() * 15 + 10; 
        let posX = Math.random() * 100;
        let delay = Math.random() * 15; 
        let duration = Math.random() * 12 + 8; 
        
        petal.style.width = `${size}px`;
        petal.style.height = `${size * 1.2}px`; /* slightly oval */
        petal.style.left = `${posX}vw`;
        petal.style.animationDuration = `${duration}s`;
        petal.style.animationDelay = `${delay}s`;
        petal.style.background = petalColors[Math.floor(Math.random() * petalColors.length)];
        
        petalsContainer.appendChild(petal);
    }
}

// Floating Particles in Hero Section
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    hero.appendChild(particlesContainer);
    
    // Create 40 magical floating particles
    const particleCount = 40;
    
    for (let i = 0; i < particleCount; i++) {
        let particle = document.createElement('div');
        particle.className = 'particle';
        
        let size = Math.random() * 6 + 2; 
        let posX = Math.random() * 100;
        let delay = Math.random() * 5; 
        let duration = Math.random() * 8 + 6; 
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        // Randomly set some particles to be slightly pink/gold for variety
        const colors = [
            'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)',
            'radial-gradient(circle, rgba(212,175,55,0.8) 0%, rgba(212,175,55,0) 70%)',
            'radial-gradient(circle, rgba(232,195,185,0.8) 0%, rgba(232,195,185,0) 70%)'
        ];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
    }
}

// Scroll Reveal Animations
function reveal() {
    var reveals = document.querySelectorAll('.reveal');
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

window.addEventListener('scroll', reveal);
// Trigger once on load
reveal();

// Background Music Control
const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');
let isPlaying = false;

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.classList.remove('playing');
        musicBtn.innerHTML = '<i class="fas fa-music"></i>';
    } else {
        bgMusic.play();
        musicBtn.classList.add('playing');
        musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
    isPlaying = !isPlaying;
});

// Countdown Timer
// Set the wedding date to April 25, 2026, 19:00:00
const countDownDate = new Date("April 25, 2026 19:00:00").getTime();

const x = setInterval(function() {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display formatted results
    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

    // If countdown is finished
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "<h3>It's our wedding day!</h3>";
    }
}, 1000);

// Language Toggle Logic
const langBtn = document.getElementById('lang-btn');
const langText = document.getElementById('lang-text');
let currentLang = 'en';

if(langBtn) {
    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'hi' : 'en';
        
        // Switch the text of the button itself
        langText.textContent = currentLang === 'en' ? 'A/अ' : 'अ/A';
        
        // Find all elements with translation data attributes and update them
        const translatableElements = document.querySelectorAll('[data-en][data-hi]');
        
        translatableElements.forEach(el => {
            // Specifically replacing text but keeping any span children intact (e.g. for Shilpi <span>&</span> Ankush)
            if (el.classList.contains('names') && currentLang === 'en') {
                 el.innerHTML = 'Shilpi <span>&</span> Ankush';
                 return;
            } else if (el.classList.contains('names') && currentLang === 'hi') {
                 el.innerHTML = 'शिल्पी <span>और</span> अंकुश';
                 return;
            }

            // Standard text replacement
            el.textContent = el.getAttribute(`data-${currentLang}`);
        });
    });
}

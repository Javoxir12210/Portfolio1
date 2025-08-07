// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    gsap.to(preloader, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
            preloader.style.display = 'none';
            // Show notification after page loads
            showNotification('success', 'Xush kelibsiz! Saytga muvaffaqiyatli kirdingiz.');
            // Show console hint after 5 seconds
            setTimeout(() => {
                showNotification('info', 'Eslatma: F1 tugmasini bosib, konsolni ochishingiz mumkin.');
            }, 5000);
        }
    });
});

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenuButton.classList.toggle('text-white');
});

// МГНОВЕННАЯ ПРОКРУТКА БЕЗ АНИМАЦИИ (исправлено!)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        // Закрываем мобильное меню при клике
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.classList.remove('text-white');
        }
        
        // МГНОВЕННАЯ ПРОКРУТКА БЕЗ ЛАГОВ
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'auto' // 'auto' вместо 'smooth' для мгновенной прокрутки
            });
        }
    });
});

// Animate Skill Bars on Scroll
function animateSkillBars() {
    gsap.utils.toArray('.skill-progress').forEach(bar => {
        gsap.fromTo(bar,
            {width: 0},
            {
                width: bar.dataset.width + '%',
                duration: 1.5,
                ease: "elastic.out(1, 0.5)",
                scrollTrigger: {
                    trigger: bar,
                    start: "top 80%"
                }
            }
        );
    });
}

// Остальной код без изменений...
// (Game Cursor Effect, Back to Top Button, Typewriter Effect и т.д.)

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateSkillBars();
    createMatrixBackground();
    initTypewriter();
    initScrollAnimations();
    init3DBackground();
    updateTime();
    initSkillMap();
    
    // Initialize games and visualizers
    initSpaceInvaders();
    initAudioVisualizer();
    
    // Animate hero content on load
    gsap.to('.hero-content', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.5
    });
    
    // Close game when clicking X
    document.getElementById('gameClose').addEventListener('click', () => {
        document.getElementById('space-invaders').style.display = 'none';
    });
});

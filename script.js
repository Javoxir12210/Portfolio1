function simpleFadeIn() {
  document.querySelectorAll('.fade-in').forEach(el => {
    el.style.transition = 'all 0.8s ease';
    el.style.opacity = '1';
    el.style.transform = 'translate(0)';
  });
}
document.addEventListener('DOMContentLoaded', simpleFadeIn);
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

        // Smooth Scrolling for Navigation Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                gsap.to(window, {
                    scrollTo: {
                        y: targetElement,
                        offsetY: 80
                    },
                    duration: 1,
                    ease: "power2.inOut"
                });
                
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
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

        // Game Cursor Effect
        const gameCursor = document.querySelector('.game-cursor');
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        const speed = 0.1;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            const distX = mouseX - cursorX;
            const distY = mouseY - cursorY;
            
            cursorX = cursorX + (distX * speed);
            cursorY = cursorY + (distY * speed);
            
            gsap.to(gameCursor, {
                left: cursorX,
                top: cursorY,
                duration: 0.1
            });
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .project-card, .tech-icon, input, textarea');

        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                gameCursor.classList.add('active');
                
                if (!el.classList.contains('tech-icon')) return;
                
                for (let i = 0; i < 5; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'particle';
                    const rect = el.getBoundingClientRect();
                    particle.style.left = `${rect.left + rect.width/2}px`;
                    particle.style.top = `${rect.top + rect.height/2}px`;
                    particle.style.setProperty('--tx', `${Math.random() * 40 - 20}px`);
                    particle.style.setProperty('--ty', `${Math.random() * 40 - 20}px`);
                    particle.style.backgroundColor = `hsl(${Math.random() * 60 + 200}, 70%, 60%)`;
                    particle.style.width = '3px';
                    particle.style.height = '3px';
                    document.getElementById('particleTrail').appendChild(particle);
                    
                    setTimeout(() => {
                        particle.remove();
                    }, 800);
                }
            });
            
            el.addEventListener('mouseleave', () => {
                gameCursor.classList.remove('active');
            });
        });

        // Back to Top Button
        const backToTopButton = document.getElementById('back-to-top');

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                gsap.to(backToTopButton, {
                    opacity: 1,
                    visibility: 'visible',
                    duration: 0.3
                });
            } else {
                gsap.to(backToTopButton, {
                    opacity: 0,
                    visibility: 'hidden',
                    duration: 0.3
                });
            }
        });

        backToTopButton.addEventListener('click', () => {
            gsap.to(window, {
                scrollTo: 0,
                duration: 1,
                ease: "power2.inOut"
            });
        });

        // Typewriter Effect with Multiple Phrases
        function initTypewriter() {
            const phrases = [
                "SALOM DUNYO! MEN JAVOHIR",
                "FRONTEND DASTURCHISI VA DIZAYNER",
                "RAQAMLI TAJRIBALAR YARATAMAN",
                "KELING, AJOYIB NARSANI YARATAYLIK"
            ];
            
            let currentPhrase = 0;
            let currentChar = 0;
            let isDeleting = false;
            let isEnd = false;
            
            const typewriterElement = document.querySelector('.typewriter');
            
            function type() {
                isEnd = false;
                const fullTxt = phrases[currentPhrase];
                
                if (isDeleting) {
                    typewriterElement.textContent = fullTxt.substring(0, currentChar - 1);
                    currentChar--;
                } else {
                    typewriterElement.textContent = fullTxt.substring(0, currentChar + 1);
                    currentChar++;
                }
                
                if (!isDeleting && currentChar === fullTxt.length) {
                    isEnd = true;
                    isDeleting = true;
                    setTimeout(type, 1500);
                } else if (isDeleting && currentChar === 0) {
                    isDeleting = false;
                    currentPhrase = (currentPhrase + 1) % phrases.length;
                    setTimeout(type, 500);
                } else {
                    const speed = isDeleting ? 50 : isEnd ? 1000 : 100;
                    setTimeout(type, speed);
                }
            }
            
            setTimeout(type, 1000);
        }

        // Matrix Code Background Effect
        function createMatrixBackground() {
            const container = document.getElementById('matrixCode');
            const characters = "01";
            const fontSize = 16;
            const columns = Math.floor(window.innerWidth / fontSize);
            const rows = Math.floor(window.innerHeight / fontSize);
            
            for (let i = 0; i < columns; i++) {
                const delay = Math.random() * 5;
                const duration = 5 + Math.random() * 10;
                
                const column = document.createElement('div');
                column.className = 'binary-rain';
                column.style.left = `${i * fontSize}px`;
                column.style.animationDuration = `${duration}s`;
                column.style.animationDelay = `${delay}s`;
                
                for (let j = 0; j < rows; j++) {
                    const char = document.createElement('span');
                    char.textContent = characters.charAt(Math.floor(Math.random() * characters.length));
                    char.style.opacity = Math.random() * 0.5 + 0.1;
                    char.style.animationDelay = `${Math.random() * 5}s`;
                    column.appendChild(char);
                }
                
                container.appendChild(column);
            }
        }

        // Scroll Animation for Sections
        function initScrollAnimations() {
            const fadeElements = document.querySelectorAll('.fade-in');
            
            fadeElements.forEach(el => {
                gsap.from(el, {
                    opacity: 0,
                    x: el.classList.contains('from-left') ? -50 : 50,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                });
            });
            
            const sectionTitles = document.querySelectorAll('.section-title');
            
            sectionTitles.forEach(title => {
                gsap.from(title.querySelector('.gradient-text'), {
                    backgroundPosition: '0% 50%',
                    duration: 2,
                    scrollTrigger: {
                        trigger: title,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                });
                
                gsap.from(title.parentElement.querySelector('.w-24'), {
                    scaleX: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: title,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                });
            });
        }

        // 3D Background with Three.js
        function init3DBackground() {
            const canvas = document.getElementById('canvas3d');
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ 
                canvas: canvas,
                alpha: true,
                antialias: true
            });
            
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            
            // Add particles
            const particlesGeometry = new THREE.BufferGeometry();
            const particlesCount = 10000;
            const posArray = new Float32Array(particlesCount * 3);
            
            for (let i = 0; i < particlesCount * 3; i++) {
                posArray[i] = (Math.random() - 0.5) * 10;
            }
            
            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            
            // Add colors
            const colorArray = new Float32Array(particlesCount * 3);
            for (let i = 0; i < particlesCount * 3; i++) {
                colorArray[i] = Math.random();
            }
            particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
            
            const particlesMaterial = new THREE.PointsMaterial({
                size: 0.02,
                vertexColors: true,
                transparent: true,
                opacity: 0.8,
                sizeAttenuation: true
            });
            
            const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
            scene.add(particlesMesh);
            
            // Add glowing orb
            const orbGeometry = new THREE.SphereGeometry(0.5, 32, 32);
            const orbMaterial = new THREE.MeshBasicMaterial({
                color: 0x6c5ce7,
                transparent: true,
                opacity: 0.3
            });
            const orb = new THREE.Mesh(orbGeometry, orbMaterial);
            scene.add(orb);
            
            // Add light
            const pointLight = new THREE.PointLight(0x00cec9, 1, 100);
            pointLight.position.set(1, 1, 2);
            scene.add(pointLight);
            
            camera.position.z = 3;
            
            // Animation loop
            function animate() {
                requestAnimationFrame(animate);
                
                particlesMesh.rotation.x += 0.0005;
                particlesMesh.rotation.y += 0.001;
                
                orb.rotation.x += 0.005;
                orb.rotation.y += 0.005;
                
                renderer.render(scene, camera);
            }
            
            animate();
            
            // Handle window resize
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
        }

        // Current Time Display
        function updateTime() {
            const timeElement = document.getElementById('current-time');
            setInterval(() => {
                const now = new Date();
                timeElement.textContent = now.toLocaleTimeString('uz-UZ', { hour12: false });
            }, 1000);
        }

        // Form Submission Handler
        function submitForm() {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            console.log({ name, email, subject, message });
            
            showNotification('success', 'Xabaringiz uchun rahmat! Tez orada siz bilan bog\'lanaman.');
            
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('subject').value = '';
            document.getElementById('message').value = '';
        }

        // Notification System
        function showNotification(type, message) {
            const notificationArea = document.getElementById('notification-area');
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            
            let icon = '';
            switch(type) {
                case 'success':
                    icon = '<i class="fas fa-check-circle"></i>';
                    break;
                case 'error':
                    icon = '<i class="fas fa-exclamation-circle"></i>';
                    break;
                case 'warning':
                    icon = '<i class="fas fa-exclamation-triangle"></i>';
                    break;
                case 'info':
                    icon = '<i class="fas fa-info-circle"></i>';
                    break;
                default:
                    icon = '<i class="fas fa-bell"></i>';
            }
            
            notification.innerHTML = `${icon} ${message}`;
            notificationArea.appendChild(notification);
            
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 5000);
        }

        // Theme Switcher
        const themeSwitcher = document.getElementById('themeSwitcher');
        themeSwitcher.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            
            if (document.body.classList.contains('light-theme')) {
                themeSwitcher.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            } else {
                themeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            }
        });

        // Check for saved theme preference
        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-theme');
            themeSwitcher.innerHTML = '<i class="fas fa-moon"></i>';
        }

        // Language Switcher
        const languageButtons = document.querySelectorAll('.language-switcher button');
        languageButtons.forEach(button => {
            button.addEventListener('click', () => {
                languageButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                // Here you would implement language switching logic
                showNotification('info', 'Til o\'zgartirildi: ' + button.textContent);
            });
        });

        // Developer Console
        const developerConsole = document.getElementById('developerConsole');
        const consoleInput = document.getElementById('consoleInput');
        const consoleClose = document.getElementById('consoleClose');
        const consoleMinimize = document.getElementById('consoleMinimize');
        const consoleMaximize = document.getElementById('consoleMaximize');
        const terminal = document.getElementById('terminal');

        // Toggle console with F1 key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'F1') {
                e.preventDefault();
                developerConsole.classList.toggle('hidden');
                
                if (!developerConsole.classList.contains('hidden')) {
                    consoleInput.focus();
                }
            }
        });

        // Console controls
        consoleClose.addEventListener('click', () => {
            developerConsole.classList.add('hidden');
        });

        consoleMinimize.addEventListener('click', () => {
            // Implement minimize functionality
            showNotification('info', 'Konsol minimallashtirildi');
        });

        consoleMaximize.addEventListener('click', () => {
            // Implement maximize functionality
            showNotification('info', 'Konsol maksimallashtirildi');
        });

        // Console commands
        consoleInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const command = consoleInput.value.trim();
                consoleInput.value = '';
                
                // Add command to terminal
                const commandLine = document.createElement('div');
                commandLine.className = 'terminal-line';
                commandLine.innerHTML = `<span class="terminal-prompt">user@javohir-dev:~$</span> <span class="terminal-command">${command}</span>`;
                terminal.insertBefore(commandLine, terminal.lastElementChild);
                
                // Process command
                processCommand(command);
                
                // Scroll to bottom
                terminal.scrollTop = terminal.scrollHeight;
            }
        });

        function processCommand(command) {
            let output = '';
            
            switch(command.toLowerCase()) {
                case 'help':
                    output = 'Mavjud buyruqlar: about, skills, projects, contact, clear, game, music';
                    break;
                case 'about':
                    output = 'Javohir - Frontend dasturchi. 5+ yillik tajriba. React, Vue, JavaScript mutaxassisi.';
                    break;
                case 'skills':
                    output = 'HTML5, CSS3, JavaScript (ES6+), React, Vue, Node.js, Git, Figma va boshqalar.';
                    break;
                case 'projects':
                    output = 'E-commerce paneli, Sayohat ilovasi, Vazifalar boshqaruvi tizimi va boshqa ko\'plab loyihalar.';
                    break;
                case 'contact':
                    output = 'Email: javohir.dev@example.com | Telefon: +998991234567';
                    break;
                case 'clear':
                    // Clear terminal
                    while (terminal.children.length > 1) {
                        terminal.removeChild(terminal.firstChild);
                    }
                    return;
                case 'game':
                    // Toggle space invaders game
                    document.getElementById('space-invaders').style.display = 
                        document.getElementById('space-invaders').style.display === 'block' ? 'none' : 'block';
                    output = 'Space Invaders o\'yini ' + 
                        (document.getElementById('space-invaders').style.display === 'block' ? 'yoqildi' : 'o\'chirildi');
                    break;
                case 'music':
                    // Toggle audio visualizer
                    document.getElementById('audio-visualizer').style.display = 
                        document.getElementById('audio-visualizer').style.display === 'block' ? 'none' : 'block';
                    output = 'Audio vizualizator ' + 
                        (document.getElementById('audio-visualizer').style.display === 'block' ? 'yoqildi' : 'o\'chirildi');
                    break;
                default:
                    output = `Buyruq topilmadi: ${command}. "help" buyrug'i bilan mavjud buyruqlar ro'yxatini ko'ring.`;
            }
            
            const outputLine = document.createElement('div');
            outputLine.className = 'terminal-line terminal-output';
            outputLine.textContent = output;
            terminal.insertBefore(outputLine, terminal.lastElementChild);
        }

        // Space Invaders Game
        function initSpaceInvaders() {
            const canvas = document.getElementById('game-canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = 300;
            canvas.height = 200;
            
            // Game variables
            let gameOver = false;
            let score = 0;
            
            // Player
            const player = {
                x: canvas.width / 2 - 15,
                y: canvas.height - 30,
                width: 30,
                height: 15,
                speed: 5,
                color: '#6c5ce7',
                isMovingLeft: false,
                isMovingRight: false
            };
            
            // Bullets
            const bullets = [];
            const bulletSpeed = 7;
            const bulletWidth = 3;
            const bulletHeight = 10;
            const bulletColor = '#00cec9';
            
            // Enemies
            const enemies = [];
            const enemyWidth = 20;
            const enemyHeight = 20;
            const enemyPadding = 20;
            const enemyOffsetTop = 30;
            const enemyOffsetLeft = 30;
            const enemyRows = 3;
            const enemyCols = 8;
            let enemyDirection = 1;
            let enemySpeed = 0.5;
            
            // Create enemies
            for (let r = 0; r < enemyRows; r++) {
                for (let c = 0; c < enemyCols; c++) {
                    enemies.push({
                        x: enemyOffsetLeft + c * (enemyWidth + enemyPadding),
                        y: enemyOffsetTop + r * (enemyHeight + enemyPadding),
                        width: enemyWidth,
                        height: enemyHeight,
                        color: r === 0 ? '#f59e0b' : r === 1 ? '#00cec9' : '#6c5ce7'
                    });
                }
            }
            
            // Event listeners for player movement
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') player.isMovingLeft = true;
                if (e.key === 'ArrowRight') player.isMovingRight = true;
                if (e.key === ' ') shoot();
            });
            
            document.addEventListener('keyup', (e) => {
                if (e.key === 'ArrowLeft') player.isMovingLeft = false;
                if (e.key === 'ArrowRight') player.isMovingRight = false;
            });
            
            // Shoot bullet
            function shoot() {
                bullets.push({
                    x: player.x + player.width / 2 - bulletWidth / 2,
                    y: player.y,
                    width: bulletWidth,
                    height: bulletHeight,
                    color: bulletColor
                });
            }
            


            
            // Game loop
            function gameLoop() {
                if (gameOver) return;
                
                // Clear canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Draw player
                ctx.fillStyle = player.color;
                ctx.fillRect(player.x, player.y, player.width, player.height);
                
                // Move player
                if (player.isMovingLeft && player.x > 0) {
                    player.x -= player.speed;
                }
                if (player.isMovingRight && player.x < canvas.width - player.width) {
                    player.x += player.speed;
                }
                
                // Draw and move bullets
                for (let i = 0; i < bullets.length; i++) {
                    const bullet = bullets[i];
                    ctx.fillStyle = bullet.color;
                    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
                    
                    bullet.y -= bulletSpeed;
                    
                    // Remove bullets that go off screen
                    if (bullet.y < 0) {
                        bullets.splice(i, 1);
                        i--;
                    }
                }
                
                // Draw enemies
                let edgeReached = false;
                for (let i = 0; i < enemies.length; i++) {
                    const enemy = enemies[i];
                    ctx.fillStyle = enemy.color;
                    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
                    
                    // Move enemies
                    enemy.x += enemySpeed * enemyDirection;
                    
                    // Check if enemies reached edge
                    if ((enemy.x + enemy.width > canvas.width) || (enemy.x < 0)) {
                        edgeReached = true;
                    }
                    
                    // Check if enemy reached bottom
                    if (enemy.y + enemy.height > canvas.height - player.height) {
                        gameOver = true;
                        showNotification('error', 'O\'yin tugadi! Hisob: ' + score);
                    }
                }
                
                // Change enemy direction if edge reached
                if (edgeReached) {
                    enemyDirection *= -1;
                    for (let i = 0; i < enemies.length; i++) {
                        enemies[i].y += 20;
                    }
                    enemySpeed += 0.1;
                }
                
                // Check for bullet-enemy collisions
                for (let i = 0; i < bullets.length; i++) {
                    const bullet = bullets[i];
                    
                    for (let j = 0; j < enemies.length; j++) {
                        const enemy = enemies[j];
                        
                        if (
                            bullet.x < enemy.x + enemy.width &&
                            bullet.x + bullet.width > enemy.x &&
                            bullet.y < enemy.y + enemy.height &&
                            bullet.y + bullet.height > enemy.y
                        ) {
                            // Collision detected
                            bullets.splice(i, 1);
                            enemies.splice(j, 1);
                            score += 10;
                            i--;
                            break;
                        }
                    }
                }
                
                // Check if all enemies are defeated
                if (enemies.length === 0) {
                    gameOver = true;
                    showNotification('success', 'Tabriklaymiz! Barcha dushmanlarni yo\'q qildingiz. Hisob: ' + score);
                }
                
                // Draw score
                ctx.fillStyle = '#ffffff';
                ctx.font = '14px Orbitron';
                ctx.fillText('Hisob: ' + score, 10, 20);
                
                requestAnimationFrame(gameLoop);
            }
            
            gameLoop();
        }

        // Audio Visualizer
        function initAudioVisualizer() {
            const canvas = document.getElementById('visualizer-canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = 300;
            canvas.height = 100;
            
            // Audio context
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            let analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            
            // Microphone access
            navigator.mediaDevices.getUserMedia({ audio: true, video: false })
                .then(function(stream) {
                    const source = audioContext.createMediaStreamSource(stream);
                    source.connect(analyser);
                    
                    function draw() {
                        requestAnimationFrame(draw);
                        
                        analyser.getByteFrequencyData(dataArray);
                        
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        
                        const barWidth = (canvas.width / bufferLength) * 2.5;
                        let x = 0;
                        
                        for (let i = 0; i < bufferLength; i++) {
                            const barHeight = dataArray[i] / 2;
                            
                            ctx.fillStyle = `hsl(${i * 2}, 100%, 50%)`;
                            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                            
                            x += barWidth + 1;
                        }
                    }
                    
                    draw();
                })
                .catch(function(err) {
                    console.log('Audio visualizer error: ', err);
                    showNotification('error', 'Audio vizualizator ishlamadi: Mikrofon ruxsati berilmagan');
                });
        }

        // Interactive Skill Map
        function initSkillMap() {
            const skillMap = document.getElementById('skillMap');
            const skills = [
                { name: 'HTML5', icon: 'fab fa-html5', color: '#e34f26', x: 20, y: 20 },
                { name: 'CSS3', icon: 'fab fa-css3-alt', color: '#264de4', x: 80, y: 20 },
                { name: 'JavaScript', icon: 'fab fa-js', color: '#f7df1e', x: 20, y: 80 },
                { name: 'React', icon: 'fab fa-react', color: '#61dafb', x: 80, y: 80 },
                { name: 'Vue', icon: 'fab fa-vuejs', color: '#42b883', x: 20, y: 140 },
                { name: 'Node.js', icon: 'fab fa-node-js', color: '#68a063', x: 80, y: 140 },
                { name: 'Git', icon: 'fab fa-git-alt', color: '#f34f29', x: 20, y: 200 },
                { name: 'Figma', icon: 'fab fa-figma', color: '#a259ff', x: 80, y: 200 }
            ];
            
            // Create skill nodes
            skills.forEach(skill => {
                const node = document.createElement('div');
                node.className = 'skill-node';
                node.style.left = `${skill.x}px`;
                node.style.top = `${skill.y}px`;
                node.style.borderColor = skill.color;
                node.innerHTML = `<i class="${skill.icon}" style="color: ${skill.color}"></i>`;
                
                // Add tooltip
                const tooltip = document.createElement('div');
                tooltip.className = 'skill-tooltip';
                tooltip.textContent = skill.name;
                tooltip.style.borderColor = skill.color;
                node.appendChild(tooltip);
                
                // Show tooltip on hover
                node.addEventListener('mouseenter', () => {
                    tooltip.style.opacity = '1';
                    tooltip.style.left = `${skill.x + 90}px`;
                    tooltip.style.top = `${skill.y}px`;
                });
                
                node.addEventListener('mouseleave', () => {
                    tooltip.style.opacity = '0';
                });
                
                skillMap.appendChild(node);
            });
            
            // Create connections between nodes
            for (let i = 0; i < skills.length - 1; i++) {
                for (let j = i + 1; j < skills.length; j++) {
                    const skill1 = skills[i];
                    const skill2 = skills[j];
                    
                    const line = document.createElement('div');
                    line.className = 'skill-connection';
                    
                    // Calculate distance and angle between nodes
                    const dx = skill2.x - skill1.x;
                    const dy = skill2.y - skill1.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                    
                    line.style.width = `${distance}px`;
                    line.style.left = `${skill1.x}px`;
                    line.style.top = `${skill1.y}px`;
                    line.style.transform = `rotate(${angle}deg)`;
                    line.style.backgroundColor = `rgba(${hexToRgb(skill1.color)}, 0.3)`;
                    
                    skillMap.appendChild(line);
                }
            }
            
            // Helper function to convert hex to rgb
            function hexToRgb(hex) {
                const r = parseInt(hex.slice(1, 3), 16);
                const g = parseInt(hex.slice(3, 5), 16);
                const b = parseInt(hex.slice(5, 7), 16);
                return `${r}, ${g}, ${b}`;
            }
        }

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
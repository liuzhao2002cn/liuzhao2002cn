// ===================================
// 英雄区交互效果
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // 1. 打字机效果
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const words = JSON.parse(typingElement.dataset.words || '[]');
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                // 完成输入，暂停后开始删除
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // 完成删除，切换到下一个词
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 500;
            }

            setTimeout(type, typingSpeed);
        }

        if (words.length > 0) {
            type();
        }
    }

    // 2. 数字滚动动画
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateNumber(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000; // 2秒
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // 使用 Intersection Observer 在元素进入视口时触发动画
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                observer.unobserve(entry.target); // 只动画一次
            }
        });
    }, observerOptions);

    statNumbers.forEach(number => {
        observer.observe(number);
    });

    // 3. Particles.js 配置
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { 
                    value: 80,
                    density: { 
                        enable: true, 
                        value_area: 800 
                    } 
                },
                color: { 
                    value: ['#e580cd', '#aaaaff', '#ffffff'] 
                },
                shape: { 
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: { 
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: { 
                    value: 4,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { 
                        enable: true, 
                        mode: 'grab' 
                    },
                    onclick: { 
                        enable: true, 
                        mode: 'push' 
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    // 4. 平滑滚动
    const exploreButton = document.querySelector('a[href="#featured-content"]');
    if (exploreButton) {
        exploreButton.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector('#featured-content');
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // 5. 滚动视差效果
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-enhanced');
        
        if (hero) {
            const heroHeight = hero.offsetHeight;
            const scrollProgress = Math.min(scrolled / heroHeight, 1);
            
            // 背景层视差
            const background = hero.querySelector('.hero-background');
            if (background) {
                background.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
            
            // 内容层渐隐
            const content = hero.querySelector('.hero-content');
            if (content) {
                content.style.opacity = 1 - scrollProgress;
                content.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // 6. 卡片悬浮音效（可选）
    const sectionCards = document.querySelectorAll('.section-card');
    sectionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // 这里可以添加音效
            // new Audio('/sounds/hover.mp3').play();
        });
    });
});

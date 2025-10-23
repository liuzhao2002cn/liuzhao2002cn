// ========================================
// DOM 元素缓存
// ========================================
const DOM = {
    statsSection: null,
    stats: null,
    particlesContainer: null,
    scrollIndicator: null,
    profileCard: null,
    heroSection: null,
    avatarImage: null,
    profileName: null,
    tags: null
};

// 初始化 DOM 缓存
function initDOMCache() {
    DOM.statsSection = document.querySelector('.profile-stats');
    DOM.stats = document.querySelectorAll('.stat-value');
    DOM.particlesContainer = document.getElementById('hero-particles');
    DOM.scrollIndicator = document.querySelector('.scroll-indicator');
    DOM.profileCard = document.querySelector('.profile-card');
    DOM.heroSection = document.querySelector('.hero-card-section');
    DOM.avatarImage = document.querySelector('.avatar-image');
    DOM.profileName = document.querySelector('.profile-name');
    DOM.tags = document.querySelectorAll('.tag');
}

document.addEventListener('DOMContentLoaded', function() {
    // 初始化 DOM 缓存
    initDOMCache();

    // 检查是否启用动画减弱（用户偏好）
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // 禁用所有动画
        document.body.classList.add('reduce-motion');
        // 移除粒子效果
        if (DOM.particlesContainer) {
            DOM.particlesContainer.style.display = 'none';
        }
        return; // 提前返回，不执行动画
    }

    // ========================================
    // 1. 统计数字滚动动画
    // ========================================

    function animateStats() {
        if (!DOM.stats || DOM.stats.length === 0) return;

        DOM.stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2秒
            const step = target / (duration / 16); // 60fps
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });
    }
    
    // 使用 Intersection Observer 在元素可见时触发动画
    if (DOM.statsSection) {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    animateStats();
                }
            });
        }, observerOptions);

        observer.observe(DOM.statsSection);
    }
    
    
    // ========================================
    // 2. 粒子效果（可选）
    // ========================================

    function initParticles() {
        if (!DOM.particlesContainer) return;
        
        // 检查是否有 particles.js 库
        if (typeof particlesJS !== 'undefined') {
            particlesJS('hero-particles', {
                particles: {
                    number: {
                        value: 50,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: ['#e580cd', '#aaaaff', '#ffb6e8']
                    },
                    shape: {
                        type: ['circle', 'star'],
                        stroke: {
                            width: 0,
                            color: '#000000'
                        }
                    },
                    opacity: {
                        value: 0.3,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 2,
                            size_min: 0.5,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: false
                    },
                    move: {
                        enable: true,
                        speed: 1.5,
                        direction: 'none',
                        random: true,
                        straight: false,
                        out_mode: 'out',
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'bubble'
                        },
                        onclick: {
                            enable: true,
                            mode: 'push'
                        },
                        resize: true
                    },
                    modes: {
                        bubble: {
                            distance: 150,
                            size: 6,
                            duration: 2,
                            opacity: 0.6,
                            speed: 3
                        },
                        push: {
                            particles_nb: 3
                        }
                    }
                },
                retina_detect: true
            });
        }
    }
    
    // 延迟初始化粒子效果
    setTimeout(initParticles, 500);
    
    
    // ========================================
    // 3. 平滑滚动到内容区
    // ========================================

    if (DOM.scrollIndicator) {
        DOM.scrollIndicator.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector('#content') || document.querySelector('main');
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }


    // ========================================
    // 4. 卡片视差效果（鼠标跟随）
    // ========================================

    if (DOM.profileCard && DOM.heroSection && window.innerWidth > 768) {
        let mouseMoveRAF;

        DOM.heroSection.addEventListener('mousemove', function(e) {
            if (mouseMoveRAF) {
                window.cancelAnimationFrame(mouseMoveRAF);
            }

            mouseMoveRAF = window.requestAnimationFrame(() => {
                const rect = DOM.heroSection.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const deltaX = (x - centerX) / centerX;
                const deltaY = (y - centerY) / centerY;

                const rotateX = deltaY * 5; // 最大旋转5度
                const rotateY = deltaX * 5;

                DOM.profileCard.style.transform = `
                    perspective(1000px)
                    rotateX(${-rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-8px)
                `;
            });
        }, { passive: true });

        DOM.heroSection.addEventListener('mouseleave', function() {
            if (mouseMoveRAF) {
                window.cancelAnimationFrame(mouseMoveRAF);
            }
            DOM.profileCard.style.transform = '';
        });
    }
    
    
    // ========================================
    // 5. 头像加载动画
    // ========================================

    if (DOM.avatarImage) {
        DOM.avatarImage.addEventListener('load', function() {
            this.classList.add('loaded');
        });

        // 如果图片已经加载（从缓存）
        if (DOM.avatarImage.complete) {
            DOM.avatarImage.classList.add('loaded');
        }
    }
    
    
    // ========================================
    // 6. 随机彩虹效果（可选）
    // ========================================

    function addRainbowEffect() {
        if (!DOM.profileName) return;

        // 添加额外的动画类
        setInterval(() => {
            const colors = ['#e580cd', '#aaaaff', '#ffb6e8', '#ffa6f6'];
            const randomColor1 = colors[Math.floor(Math.random() * colors.length)];
            const randomColor2 = colors[Math.floor(Math.random() * colors.length)];

            DOM.profileName.style.background = `linear-gradient(135deg, ${randomColor1}, ${randomColor2})`;
            DOM.profileName.style.backgroundClip = 'text';
            DOM.profileName.style.webkitBackgroundClip = 'text';
        }, 3000);
    }

    // 取消注释以启用彩虹效果
    // addRainbowEffect();


    // ========================================
    // 7. 标签云随机颜色（可选）
    // ========================================

    function randomizeTagColors() {
        if (!DOM.tags || DOM.tags.length === 0) return;

        const colors = [
            { bg: 'rgba(229, 128, 205, 0.1)', border: 'rgba(229, 128, 205, 0.3)', text: '#e580cd' },
            { bg: 'rgba(170, 170, 255, 0.1)', border: 'rgba(170, 170, 255, 0.3)', text: '#aaaaff' },
            { bg: 'rgba(255, 182, 232, 0.1)', border: 'rgba(255, 182, 232, 0.3)', text: '#ffb6e8' }
        ];

        DOM.tags.forEach(tag => {
            const color = colors[Math.floor(Math.random() * colors.length)];
            tag.style.background = `linear-gradient(135deg, ${color.bg}, ${color.bg})`;
            tag.style.borderColor = color.border;
            tag.style.color = color.text;
        });
    }

    // 取消注释以启用随机标签颜色
    // randomizeTagColors();
    
    
    // ========================================
    // 8. 调试信息（开发时使用）
    // ========================================

    // 取消注释以启用调试
    /*
    console.log('Hero Card script loaded');
    console.log('Profile card:', DOM.profileCard);
    console.log('Stats section:', DOM.statsSection);
    console.log('Avatar image:', DOM.avatarImage);
    */
});

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // 1. 统计数字滚动动画
    // ========================================
    
    function animateStats() {
        const stats = document.querySelectorAll('.stat-value');
        
        stats.forEach(stat => {
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
    
    const statsSection = document.querySelector('.profile-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    
    // ========================================
    // 2. 粒子效果（可选）
    // ========================================
    
    function initParticles() {
        const particlesContainer = document.getElementById('hero-particles');
        if (!particlesContainer) return;
        
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
    
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function(e) {
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
    
    const profileCard = document.querySelector('.profile-card');
    const heroSection = document.querySelector('.hero-card-section');
    
    if (profileCard && window.innerWidth > 768) {
        heroSection.addEventListener('mousemove', function(e) {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            const rotateX = deltaY * 5; // 最大旋转5度
            const rotateY = deltaX * 5;
            
            profileCard.style.transform = `
                perspective(1000px) 
                rotateX(${-rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateY(-8px)
            `;
        });
        
        heroSection.addEventListener('mouseleave', function() {
            profileCard.style.transform = '';
        });
    }
    
    
    // ========================================
    // 5. 头像加载动画
    // ========================================
    
    const avatarImage = document.querySelector('.avatar-image');
    if (avatarImage) {
        avatarImage.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // 如果图片已经加载（从缓存）
        if (avatarImage.complete) {
            avatarImage.classList.add('loaded');
        }
    }
    
    
    // ========================================
    // 6. 随机彩虹效果（可选）
    // ========================================
    
    function addRainbowEffect() {
        const profileName = document.querySelector('.profile-name');
        if (!profileName) return;
        
        // 添加额外的动画类
        setInterval(() => {
            const colors = ['#e580cd', '#aaaaff', '#ffb6e8', '#ffa6f6'];
            const randomColor1 = colors[Math.floor(Math.random() * colors.length)];
            const randomColor2 = colors[Math.floor(Math.random() * colors.length)];
            
            profileName.style.background = `linear-gradient(135deg, ${randomColor1}, ${randomColor2})`;
            profileName.style.backgroundClip = 'text';
            profileName.style.webkitBackgroundClip = 'text';
        }, 3000);
    }
    
    // 取消注释以启用彩虹效果
    // addRainbowEffect();
    
    
    // ========================================
    // 7. 标签云随机颜色（可选）
    // ========================================
    
    function randomizeTagColors() {
        const tags = document.querySelectorAll('.tag');
        const colors = [
            { bg: 'rgba(229, 128, 205, 0.1)', border: 'rgba(229, 128, 205, 0.3)', text: '#e580cd' },
            { bg: 'rgba(170, 170, 255, 0.1)', border: 'rgba(170, 170, 255, 0.3)', text: '#aaaaff' },
            { bg: 'rgba(255, 182, 232, 0.1)', border: 'rgba(255, 182, 232, 0.3)', text: '#ffb6e8' }
        ];
        
        tags.forEach(tag => {
            const color = colors[Math.floor(Math.random() * colors.length)];
            tag.style.background = `linear-gradient(135deg, ${color.bg}, ${color.bg})`;
            tag.style.borderColor = color.border;
            tag.style.color = color.text;
        });
    }
    
    // 取消注释以启用随机标签颜色
    // randomizeTagColors();
    
    
    // ========================================
    // 8. 性能优化：减弱动画（用户偏好）
    // ========================================
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // 禁用所有动画
        document.body.classList.add('reduce-motion');
        
        // 移除粒子效果
        const particlesContainer = document.getElementById('hero-particles');
        if (particlesContainer) {
            particlesContainer.style.display = 'none';
        }
    }
    
    
    // ========================================
    // 9. 调试信息（开发时使用）
    // ========================================
    
    // 取消注释以启用调试
    /*
    console.log('Hero Card script loaded');
    console.log('Profile card:', profileCard);
    console.log('Stats section:', statsSection);
    console.log('Avatar image:', avatarImage);
    */
});


// ========================================
// 全局辅助函数
// ========================================

// 外部调用：重新触发统计动画
window.reanimateStats = function() {
    const stats = document.querySelectorAll('.stat-value');
    stats.forEach(stat => {
        stat.textContent = '0';
    });
    setTimeout(() => {
        animateStats();
    }, 100);
};

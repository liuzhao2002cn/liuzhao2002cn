// 当整个页面的 HTML 加载并解析完成后，执行所有初始化操作
document.addEventListener("DOMContentLoaded", function() {

    // 功能 1: 渲染数学公式 (KaTeX)
    // 确保 renderMathInElement 函数存在 (由 KaTeX 的 CDN 脚本提供)
    if (typeof renderMathInElement === 'function') {
        renderMathInElement(document.body, {
            delimiters: [
                {left: '$$', right: '$$', display: true},
                {left: '$', right: '$', display: false},
                {left: '\\(', right: '\\)', display: false},
                {left: '\\[', right: '\\]', display: true}
            ],
            throwOnError: false
        });
    }

    // 功能 2: 初始化图表 (Mermaid)
    // 确保 mermaid 对象存在 (由 Mermaid 的 CDN 脚本提供)
    if (typeof mermaid !== 'undefined') {
        mermaid.initialize({ startOnLoad: true });
    }

    // 功能 3: 导航栏交互功能
    initializeNavbar();
    
    // 功能 4: 页面增强功能 (返回顶部, 网站运行时间)
    initializePageEnhancements();

});


/**
 * 初始化所有导航栏相关的交互，包括移动端菜单、滚动效果和阅读进度条
 */
function initializeNavbar() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.getElementById('navOverlay');
    const header = document.querySelector('.site-header');
    const progressBar = document.getElementById('readingProgress');

    // --- 移动端菜单切换 ---
    if (mobileMenuToggle && navMenu && navOverlay) {
        const toggleMobileMenu = () => {
            const isActive = mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.style.overflow = isActive ? 'hidden' : '';
        };

        const closeMobileMenu = () => {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        navOverlay.addEventListener('click', closeMobileMenu);
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    // --- 滚动效果和阅读进度条 ---
    if (header || progressBar) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            // Header 阴影
            if (header) {
                header.classList.toggle('scrolled', currentScroll > 50);
            }

            // 阅读进度条
            if (progressBar) {
                const windowHeight = window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight;
                const trackLength = documentHeight - windowHeight;
                // 避免 trackLength 为0时除以0
                const progress = trackLength > 0 ? (currentScroll / trackLength) * 100 : 0;
                progressBar.style.width = `${progress}%`;
            }
        });
    }
}


/**
 * 初始化页面增强功能，如网站运行时间和外部链接处理
 */
function initializePageEnhancements() {
    // --- 网站运行时长计算 ---
    const daysEl = document.getElementById('days');
    if (daysEl) {
        const launchDate = new Date('2025-10-18'); // 你的网站上线日期
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        const updateRuntime = () => {
            const now = new Date();
            const diff = now - launchDate;
            
            const days = Math.floor(diff / 86400000); // 1000 * 60 * 60 * 24
            const hours = Math.floor((diff % 86400000) / 3600000); // 1000 * 60 * 60
            const minutes = Math.floor((diff % 3600000) / 60000); // 1000 * 60
            const seconds = Math.floor((diff % 60000) / 1000);
            
            daysEl.textContent = days;
            hoursEl.textContent = hours.toString().padStart(2, '0');
            minutesEl.textContent = minutes.toString().padStart(2, '0');
            secondsEl.textContent = seconds.toString().padStart(2, '0');
        };
        
        updateRuntime(); // 立即执行一次
        setInterval(updateRuntime, 1000); // 每秒更新
    }

    // --- 为外部链接添加 rel="noopener noreferrer" ---
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer');
    });
}

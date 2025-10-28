// ========================================
// DOM 元素缓存
// ========================================
const NavDOM = {
    mobileMenuToggle: null,
    navMenu: null,
    navOverlay: null,
    header: null,
    progressBar: null,
    navLinks: null
};

// 当整个页面的 HTML 加载并解析完成后，执行所有初始化操作
document.addEventListener("DOMContentLoaded", function() {

    // 功能 1: 渲染数学公式 (KaTeX) - 按需加载
    // 只在页面包含数学公式时才渲染
    const hasMath = document.querySelector('.math, [class*="katex"]') ||
                    document.body.textContent.match(/\$\$|\\\[|\\\(/);
    if (hasMath && typeof renderMathInElement === 'function') {
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

    // 功能 2: 初始化图表 (Mermaid) - 按需加载
    // 只在页面包含 mermaid 图表时才初始化
    const hasMermaid = document.querySelector('.mermaid, [class*="mermaid"]');
    if (hasMermaid && typeof mermaid !== 'undefined') {
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
    // 缓存 DOM 元素
    NavDOM.mobileMenuToggle = document.getElementById('mobileMenuToggle');
    NavDOM.navMenu = document.querySelector('.nav-menu');
    NavDOM.navOverlay = document.getElementById('navOverlay');
    NavDOM.header = document.querySelector('.site-header');
    NavDOM.progressBar = document.getElementById('readingProgress');
    NavDOM.navLinks = document.querySelectorAll('.nav-link');

    // --- 移动端菜单切换 ---
    if (NavDOM.mobileMenuToggle && NavDOM.navMenu && NavDOM.navOverlay) {
        const toggleMobileMenu = () => {
            const isActive = NavDOM.mobileMenuToggle.classList.toggle('active');
            NavDOM.navMenu.classList.toggle('active');
            NavDOM.navOverlay.classList.toggle('active');
            document.body.style.overflow = isActive ? 'hidden' : '';
        };

        const closeMobileMenu = () => {
            NavDOM.mobileMenuToggle.classList.remove('active');
            NavDOM.navMenu.classList.remove('active');
            NavDOM.navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        NavDOM.mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        NavDOM.navOverlay.addEventListener('click', closeMobileMenu);

        // 使用缓存的 navLinks
        NavDOM.navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    // --- 滚动效果和阅读进度条 ---
    if (NavDOM.header || NavDOM.progressBar) {
        let scrollRAF;
        const handleScroll = () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            // Header 阴影
            if (NavDOM.header) {
                NavDOM.header.classList.toggle('scrolled', currentScroll > 50);
            }

            // 阅读进度条
            if (NavDOM.progressBar) {
                const windowHeight = window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight;
                const trackLength = documentHeight - windowHeight;
                // 避免 trackLength 为0时除以0
                const progress = trackLength > 0 ? (currentScroll / trackLength) * 100 : 0;
                NavDOM.progressBar.style.width = `${progress}%`;
            }
        };

        window.addEventListener('scroll', () => {
            if (scrollRAF) {
                window.cancelAnimationFrame(scrollRAF);
            }
            scrollRAF = window.requestAnimationFrame(handleScroll);
        }, { passive: true });
    }
}


/**
 * 初始化页面增强功能，如外部链接处理
 */
function initializePageEnhancements() {
    // --- 为外部链接添加 rel="noopener noreferrer" ---
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer');
    });
}

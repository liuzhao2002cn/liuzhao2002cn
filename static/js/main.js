
        document.addEventListener("DOMContentLoaded", function() {
            renderMathInElement(document.body, {
                delimiters: [
                    {left: '$$', right: '$$', display: true},
                    {left: '$', right: '$', display: false},
                    {left: '\\(', right: '\\)', display: false},
                    {left: '\\[', right: '\\]', display: true}
                ],
                throwOnError: false
            });
        });
document。addEventListener('DOMContentLoaded'， () => {
  mermaid.initialize({ startOnLoad: true });
});
// ====== 导航栏交互功能 ======

document.addEventListener('DOMContentLoaded', function() {
    // 1. 深色模式切换
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // 检查本地存储的主题设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // 2. 移动端菜单切换
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.getElementById('navOverlay');
    
    function toggleMobileMenu() {
        const isActive = mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
        
        // 防止背景滚动
        if (isActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    function closeMobileMenu() {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    
    // 点击遮罩层关闭菜单
    navOverlay.addEventListener('click', closeMobileMenu);

    // 点击菜单项后关闭移动端菜单
    document.querySelectorAll('.nav-link').forEach(function(link) {
        link.addEventListener('click', closeMobileMenu);
    });

    // 3. 滚动效果
    const header = document.querySelector('.site-header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // 添加阴影效果
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // 4. 阅读进度条
    const progressBar = document.getElementById('readingProgress');
    
    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const trackLength = documentHeight - windowHeight;
        const progress = (scrollTop / trackLength) * 100;
        
        progressBar.style.width = progress + '%';
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // 1. 返回顶部按钮
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 2. 网站运行时长计算
    // 设置你的网站上线日期 (格式: YYYY-MM-DD)
    const launchDate = new Date('2025-10-18');
    
    function updateRuntime() {
        const now = new Date();
        const diff = now - launchDate;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    // 初始化并每秒更新
    updateRuntime();
    setInterval(updateRuntime, 1000);

    // 3. 为外部链接添加图标
    document.querySelectorAll('a[target="_blank"]').forEach(function(link) {
        if (!link.querySelector('svg')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
});

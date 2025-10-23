

document.addEventListener('DOMContentLoaded', function() {
    // ========================================
    // 1. 侧边栏菜单功能
    // ========================================
    
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarMenu = document.getElementById('sidebarMenu');
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    
    // 打开侧边栏
    function openSidebar() {
        sidebarMenu.classList.add('active');
        sidebarOverlay.classList.add('active');
        sidebarMenu.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    }
    
    // 关闭侧边栏
    function closeSidebar() {
        sidebarMenu.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        sidebarMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // 恢复滚动
    }
    
    // 切换侧边栏
    function toggleSidebar() {
        if (sidebarMenu.classList.contains('active')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    }


    // 绑定事件
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    if (sidebarClose) {
        sidebarClose.addEventListener('click', closeSidebar);
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }
    
    // 点击侧边栏外部关闭
    document.addEventListener('click', function(e) {
        if (sidebarMenu && sidebarMenu.classList.contains('active')) {
            // 如果点击的不是侧边栏内部、不是切换按钮
            if (!sidebarMenu.contains(e.target) && 
                !sidebarToggle.contains(e.target)) {
                closeSidebar();
            }
        }
    });
    
    // ESC 键关闭侧边栏
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebarMenu.classList.contains('active')) {
            closeSidebar();
        }
    });
    
    // 点击侧边栏内的链接后自动关闭（移动端体验优化）
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            // 延迟关闭，让用户看到点击反馈
            setTimeout(closeSidebar, 200);
        });
    });
    
    
    // ========================================
    // 2. 搜索功能（关联搜索覆盖层）
    // ========================================
    
    const searchToggle = document.getElementById('searchToggle');
    const searchOverlay = document.getElementById('searchOverlay');
    
    if (searchToggle && searchOverlay) {
        searchToggle.addEventListener('click', function() {
            // 先关闭侧边栏（如果打开）
            if (sidebarMenu.classList.contains('active')) {
                closeSidebar();
            }
            
            // 打开搜索
            searchOverlay.classList.add('active');
            
            // 聚焦搜索输入框
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                setTimeout(() => searchInput.focus(), 100);
            }
        });
    }
    
    
    // ========================================
    // 3. 滚动时头部样式变化
    // ========================================
    
    const header = document.querySelector('.site-header');
    let lastScrollTop = 0;
    let scrollThreshold = 50;
    
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 添加滚动后的阴影效果
        if (scrollTop > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // 可选：向下滚动隐藏头部，向上滚动显示（取消注释启用）
        /*
        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
            // 向下滚动
            header.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
        */
    }
    
    // 使用节流优化滚动性能
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(handleScroll);
    });
    
    
    // ========================================
    // 4. 活动链接高亮（根据当前页面）
    // ========================================
    
    function highlightActiveLink() {
        const currentPath = window.location.pathname;
        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        
        sidebarLinks.forEach(link => {
            const linkPath = new URL(link.href).pathname;
            
            // 精确匹配或前缀匹配
            if (currentPath === linkPath || 
                (linkPath !== '/' && currentPath.startsWith(linkPath))) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    highlightActiveLink();
    
    
    // ========================================
    // 5. 触摸设备优化
    // ========================================
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    // 从右向左滑动打开侧边栏
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const screenWidth = window.innerWidth;
        
        // 从屏幕右边缘向左滑动打开侧边栏
        if (touchStartX > screenWidth - 50 && 
            touchStartX - touchEndX > swipeThreshold) {
            openSidebar();
        }
        
        // 从左向右滑动关闭侧边栏
        if (sidebarMenu.classList.contains('active') && 
            touchEndX - touchStartX > swipeThreshold) {
            closeSidebar();
        }
    }
    
    
    // ========================================
    // 6. 键盘导航优化
    // ========================================
    
    // Tab 键循环导航
    const focusableElements = sidebarMenu.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length > 0) {
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        sidebarMenu.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                } else {
                    // Tab
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            }
        });
    }
    
    
    // ========================================
    // 7. 防止快速多次点击（通过 CSS transition 和状态检查处理）
    // ========================================

    // 注意：侧边栏切换事件已经在上方绑定（第40行），
    // CSS transition 会自动处理动画过渡，无需额外防抖
    
    
    // ========================================
    // 8. 窗口大小改变时的处理
    // ========================================
    
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // 如果窗口变大到桌面尺寸，自动关闭侧边栏
            if (window.innerWidth > 768 && sidebarMenu.classList.contains('active')) {
                closeSidebar();
            }
        }, 250);
    });
    
    
    // ========================================
    // 9. 页面加载完成后移除加载动画类
    // ========================================
    
    setTimeout(function() {
        sidebarMenu.classList.remove('first-load');
        sidebarOverlay.classList.remove('first-load');
    }, 500);
    
    
    // ========================================
    // 10. 调试信息（开发时使用）
    // ========================================
    
    // 取消注释以启用调试
    /*
    console.log('Header script loaded');
    console.log('Sidebar menu:', sidebarMenu);
    console.log('Search overlay:', searchOverlay);
    */
});


// ========================================
// 全局辅助函数（可在其他地方调用）
// ========================================

// 外部调用：关闭侧边栏
window.closeSidebar = function() {
    const sidebarMenu = document.getElementById('sidebarMenu');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    
    if (sidebarMenu) {
        sidebarMenu.classList.remove('active');
        sidebarMenu.setAttribute('aria-hidden'， 'true');
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.classList.remove('active');
    }
    
    document.body.style.overflow = '';
};

// 外部调用：打开侧边栏
window.openSidebar = function() {
    const sidebarMenu = document.getElementById('sidebarMenu');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    
    if (sidebarMenu) {
        sidebarMenu.classList.add('active');
        sidebarMenu.setAttribute('aria-hidden', 'false');
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.classList.add('active');
    }
    
    document.body.style.overflow = 'hidden';
};

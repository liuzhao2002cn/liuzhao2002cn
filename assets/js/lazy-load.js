// ========================================
// 图片懒加载优化
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // 检查浏览器是否支持 Intersection Observer
    if ('IntersectionObserver' in window) {
        initLazyLoad();
    } else {
        // 降级方案：直接加载所有图片
        loadAllImages();
    }
});

/**
 * 使用 Intersection Observer 实现懒加载
 */
function initLazyLoad() {
    const lazyImages = document.querySelectorAll('img[data-src], img[loading="lazy"]');

    if (lazyImages.length === 0) return;

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                loadImage(img);
                observer.unobserve(img);
            }
        });
    }, {
        // 提前 50px 开始加载
        rootMargin: '50px 0px',
        threshold: 0.01
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

/**
 * 加载单张图片
 */
function loadImage(img) {
    // 如果设置了 data-src，使用它
    const src = img.dataset.src || img.src;

    if (src) {
        img.src = src;

        // 加载 srcset（响应式图片）
        if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
        }

        // 添加加载完成的类
        img.addEventListener('load', function() {
            img.classList.add('loaded');
            img.removeAttribute('data-src');
            img.removeAttribute('data-srcset');
        });

        // 处理加载错误
        img.addEventListener('error', function() {
            img.classList.add('error');
            console.warn('Image failed to load:', src);
        });
    }
}

/**
 * 降级方案：立即加载所有图片
 */
function loadAllImages() {
    const lazyImages = document.querySelectorAll('img[data-src]');

    lazyImages.forEach(img => {
        loadImage(img);
    });
}

/**
 * 导出函数供外部使用
 */
window.lazyLoadImages = initLazyLoad;

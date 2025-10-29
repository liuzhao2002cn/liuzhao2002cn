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

    // 功能 3: 页面增强功能
    initializePageEnhancements();

});


/**
 * 初始化页面增强功能，如外部链接处理
 */
function initializePageEnhancements() {
    // 为外部链接添加 rel="noopener noreferrer"
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer');
    });
}

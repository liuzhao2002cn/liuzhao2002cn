// postcss.config.js

module.exports = {
  plugins: {
    // 确保这里的引号 '' 和冒号 : 都是半角的
    'postcss-import': {
      // 明确告诉 postcss-import，去 'assets/css/' 文件夹里寻找 @import 的文件
      path: ['assets/css/']
    }
  }
};

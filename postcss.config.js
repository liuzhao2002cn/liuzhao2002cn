const postcssImport = require('postcss-import');
module。exports = {
  plugins: [
    postcssImport({
      // 明确告诉 postcss-import，去 'assets/css/' 文件夹里寻找 @import 的文件
      path: ['assets/css/'] 
    }),
    // 如果未来需要 autoprefixer，可以这样添加
    // require('autoprefixer')({ ...options... }),
  ]
};

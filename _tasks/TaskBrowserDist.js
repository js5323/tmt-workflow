var util = require('./lib/util');
var bs = require('browser-sync').create();  // 自动刷新浏览器

module.exports = function (gulp, config) {
  function startServer() {



    bs.init({
      // server: paths.dev.dir,
      server: {
        baseDir: './dist',
        middleware: util.middleware(config)
      },
      startPath: config['livereload']['startPath'] || '/html',
      reloadDelay: 0,
      notify: {      //自定制livereload 提醒条
        styles: [
          "margin: 0",
          "padding: 5px",
          "position: fixed",
          "font-size: 10px",
          "z-index: 9999",
          "bottom: 0px",
          "right: 0px",
          "border-radius: 0",
          "border-top-left-radius: 5px",
          "background-color: rgba(60,197,31,0.5)",
          "color: white",
          "text-align: center"
        ]
      }
    });
  }

  //注册 browser_dist 任务
  gulp.task('browser_dist', startServer);
};

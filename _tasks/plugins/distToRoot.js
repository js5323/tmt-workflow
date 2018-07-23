/**
 * 将文件发布到根目录
 */

var util = require('./../lib/util');
var path = require('path');
var gulp = require("gulp");
var del = require("del");
var replace = require("gulp-replace");

module.exports = function (config) {
    console.log('dist to root');
    gulp
      .src("./dist/html/**/*.html")
      .pipe(replace(/"\.\.\//g, "\"./"))
      .pipe(replace(/'\.\.\//g, "\'./"))
      .pipe(replace(/\.\/\.\.\//g, "\.\.\/"))
      .pipe(gulp.dest("./dist/"))
      .on("end", function() {
        del(["./dist/html/"]);
      });

    gulp
        .src("./dist/js/*.js")
        .pipe(replace(/\.\.\//g, "./"))
        .pipe(gulp.dest("./dist/js/"));

}
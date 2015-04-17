var gulp = require('gulp');
var webserver = require('gulp-webserver');
var config = require('../config');

gulp.task('webserver', function () {
  gulp.src(config.dest)
    .pipe(webserver(config.webserver));
});
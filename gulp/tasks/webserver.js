const gulp = require('gulp');
const webserver = require('gulp-webserver');
const config = require('../config');

gulp.task('webserver', () => {
  gulp.src(config.dest)
    .pipe(webserver(config.webserver));
});

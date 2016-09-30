const gulp = require('gulp');
const config = require('../config').copy;

gulp.task('copy', () => {
  gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});

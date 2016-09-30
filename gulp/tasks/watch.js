const gulp = require('gulp');
const watch = require('gulp-watch');
const config = require('../config').watch;

gulp.task('watch', () => {
  // js
  watch(config.js, () => {
    gulp.start(['webpack']);
  });

  // styl
  watch(config.styl, () => {
    gulp.start(['stylus']);
  });

  // www
  watch(config.www, () => {
    gulp.start(['copy']);
  });
});

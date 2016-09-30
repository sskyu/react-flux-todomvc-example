const gulp = require('gulp');
const gulpif = require('gulp-if');
const plumber = require('gulp-plumber');
const stylus = require('gulp-stylus');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-minify-css');
const config = require('../config').stylus;

gulp.task('stylus', () => {
  gulp.src(config.src)
    .pipe(plumber())
    .pipe(stylus())
    .pipe(concat(config.output))
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(gulpif(config.minify, minify()))
    .pipe(gulp.dest(config.dest));
});

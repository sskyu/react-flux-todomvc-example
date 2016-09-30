const path = require('path');

const dest = './build';
const src = './src';
const relativeSrcPath = path.relative('.', src);

module.exports = {

  dest: dest,

  js: {
    src: `${src}/js/**`,
    dest: `${dest}/js`,
    uglify: false
  },

  copy: {
    src: [
      `${src}/www/**`
    ],
    dest: dest
  },

  stylus: {
    src: [
      `${src}/styl/**/!(_)*`
    ],
    dest: `${dest}/css/`,
    output: 'app.css',
    autoprefixer: {
      browsers: ['last 2 versions']
    },
    minify: false
  },

  watch: {
    js: `${relativeSrcPath}/js/**`,
    styl: `${relativeSrcPath}/styl/**`,
    www: `${relativeSrcPath}/www/index.html`
  },

  webserver: {
    host: 'localhost',
    port: 8000,
    livereload: true,
    fallback: dest,
    open: 'http://localhost:8000'
  }
};

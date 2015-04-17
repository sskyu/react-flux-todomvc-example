var path = require('path');

var dest = './build';
var src = './src';
var relativeSrcPath = path.relative('.', src);

module.exports = {

  dest: dest,

  js: {
    src: src + '/js/**',
    dest: dest + '/js',
    uglify: false
  },

  webpack: {
    entry: src + '/js/app.js',
    output: {
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['', '.js']
    },
    module: {
      preLoaders: [
        {
          test: /\.js$/,
          loader: 'source-map-loader'
        }
      ],
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          // loader: 'babel-loader?stage=0' // <- without es6 polyfills
          loader: 'babel-loader?stage=0&optional=runtime'
        }
      ]
    }
  },

  copy: {
    src: [
      src + '/www/index.html'
    ],
    dest: dest
  },

  stylus: {
    src: [
      src + '/styl/**/!(_)*'
    ],
    dest: dest + '/css/',
    output: 'app.css',
    autoprefixer: {
      browsers: ['last 2 versions']
    },
    minify: false
  },

  watch: {
    js: relativeSrcPath + '/js/**',
    styl: relativeSrcPath + '/styl/**',
    www: relativeSrcPath + '/www/index.html'
  },

  webserver: {
    host: 'localhost',
    port: 8000,
    livereload: true,
    fallback: dest,
    open: 'http://localhost:8000'
  }
};
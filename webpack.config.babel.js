const src = './src';
const dest = './build';

module.exports = {
  entry: `${src}/js/app.js`,
  output: {
    path: `${dest}/js/`,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  devtool: 'eval'
};

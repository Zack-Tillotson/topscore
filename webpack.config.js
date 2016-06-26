var path = require('path');
var webpack = require('webpack');

var isProdBuild = process.argv.indexOf('-p') !== -1;

var envPlugin = new webpack.DefinePlugin({
  __DEBUG__: JSON.stringify(!isProdBuild),
  __RELEASE__: JSON.stringify(isProdBuild),
  'process.env.NODE_ENV': isProdBuild ? '"production"' : '"development"'
});

module.exports = {
  entry: {
    app: './src/index.js',
    tests: './src/tests.js'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'app/assets'),
    publicPath: 'http://localhost:8080/assets' // Required for webpack-dev-server
  },
  resolve: {
    root: [
      __dirname
    ],
    extensions: ['', '.js', '.jsx', '.raw.less']
  },
  node: {
    fs: "empty"
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.raw\.less$/, loader: 'raw!less'},
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), envPlugin],
  devServer: {
    proxy: {
      '/tests/': {
        target: 'http://localhost:8888/tests/index.html'
      },
      '/*/$': {
        target: 'http://localhost:8888/index.html',
        ignorePath: true
      }
    }
  }
};

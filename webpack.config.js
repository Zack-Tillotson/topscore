var path = require('path');
var webpack = require('webpack');

var isProdBuild = process.argv.indexOf('-p') !== -1;

var topscoreConfig = require('./topscore.config.js');

var envValues = {
  __DEBUG__: JSON.stringify(!isProdBuild),
  __RELEASE__: JSON.stringify(isProdBuild),
  'process.env.NODE_ENV': isProdBuild ? '"production"' : '"development"',
  TOPSCORE_AUTH_TOKEN: isProdBuild ? '""' : JSON.stringify(topscoreConfig.TOPSCORE_AUTH_TOKEN),
  TOPSCORE_AUTH_SECRET: isProdBuild ? '""' : JSON.stringify(topscoreConfig.TOPSCORE_AUTH_SECRET),
  TOPSCORE_EVENT_NAME: isProdBuild ? '""' : JSON.stringify(topscoreConfig.TOPSCORE_EVENT_NAME),
  TOPSCORE_API_URL: isProdBuild ? '""' : JSON.stringify(topscoreConfig.TOPSCORE_API_URL)
}

var envPlugin = new webpack.DefinePlugin(envValues);

module.exports = {
  entry: {
    app: './src/appEntry',
    tests: './src/testsEntry'
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
  plugins: [envPlugin],
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

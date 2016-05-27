'use strict';

var webpack = require("webpack");

var bower_dir = __dirname + '/bower_components';
var node_dir = __dirname + '/node_modules';
var vendor_dir = __dirname + '/vendor';
var bundle_dir = __dirname + '/build';
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
 devServer: {
    port: 3000,
    historyApiFallback: true
  },
  devtool: "#eval",

  entry: [
    'webpack/hot/dev-server',
    "./app/index.js"],


  resolve: {
    alias: {
      'immutable': bower_dir + '/immutable/dist/immutable.min.js',
      //'react': node_dir + '/react/dist/react-with-addons',
      //'react': 'react',
      'react-router': node_dir + '/react-router/umd/ReactRouter.js'
    }
  },

  output: {
    //path: bundle_dir,
    filename: 'bundle.js',
    //publicPath: 'http://localhost:8080/assets/css'
  },
  module: {
    loaders: [
      { test: /\.js?$/, exclude: /node_modules|bower_components/, loader: 'babel',  query : { presets: ['es2015', 'react', 'stage-2'] }},
      { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },

      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=image/svg+xml" },

      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" },
      { test: /\.gif$/, loader: "url-loader?mimetype=image/png" },

      // Extract css files
      {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      
      {
          test: /\.less$/,
          loader: ExtractTextPlugin.extract('css!less')
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("app.css", {
      allChunks: true
    }),

    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        _: "lodash",
        moment: "moment",

        React: "react",
        Router: node_dir + '/react-router/umd/ReactRouter.js'
    }),

    new webpack.DefinePlugin({
      API_URL: JSON.stringify("http://localhost:8000")
    }),

  ]


};

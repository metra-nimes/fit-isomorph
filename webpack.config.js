global.Promise = require('bluebird');

var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path               = require('path');

module.exports = {
  //  context: path.resolve(__dirname, 'src'),
    entry: ["babel-polyfill", "./src/main.js"],
    devtool: "source-map",
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                BROWSER: JSON.stringify(true),
                NODE_ENV: JSON.stringify( process.env.NODE_ENV || 'development' )
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("[name].css"),
        new webpack.LoaderOptionsPlugin({
        options: {
            eslint: {
            configFile: '.eslintrc',
            },
            sassLoader: {
            includePaths: [
              'node_modules', 'bower_components', 'src', '.'
            ]
          }
        }
        })
    ],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: "bundle.js"
    },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/shared'),
    },
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'eslint-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
                    presets: ['react', 'es2015']
                }
      },
      {
        test: /\.css$/,
           use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
            loader: 'css-loader',
            query: {
                modules: false,
                sourceMap: true,
                importLoaders: 2
            }
            }]
        })
      },
      {
        test: /\.scss$/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
            loader: 'css-loader',
            query: {
                modules: false,
                sourceMap: true,
                importLoaders: 2
            }
        }, {
            loader: 'sass-loader',
            query: {
                sourceMap: true,
                sourceMapContents: true
            }
        }]
    })
      },
        { test: /\.gif$/, use: "url-loader?limit=10000&mimetype=image/gif" },
        { test: /\.jpg$/, use: "url-loader?limit=10000&mimetype=image/jpg" },
        { test: /\.png$/, use: "url-loader?limit=10000&mimetype=image/png" },
        { test: /\.svg/, use: "url-loader?limit=26000&mimetype=image/svg+xml" },
        { test: /\.(woff|woff2|ttf|eot)/, use: "url-loader?limit=1" },
        { test: /\.json$/, use: "json-loader" },
        { test: /\.txt$/, use: "raw-loader" }
    ]
  },
};

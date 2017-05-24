const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const precss = require("precss");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: "./demo/index.js"
  },

  output: {
    path: path.join(__dirname, "docs"),
    filename: "[name].js",
    chunkFilename: "chunk/[name].js",
    publicPath: "./"
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        drop_console: true
      }
    }),
    new HtmlWebpackPlugin({
      title: "Image Cropper",
      template: "index.ejs",
      env: "prod"
    })
  ],
  resolve: {
    alias: {
      _: path.resolve(__dirname, "src"),
      demo: path.resolve(__dirname, "demo")
    },
    root: path.resolve("src"),
    modulesDirectories: ["node_modules"],
    extensions: ["", ".js"]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader"
      },
      { test: /\.tsx?$/, loader: "babel-loader!ts-loader" },
      {
        test: /\.(css|less)$/,
        loader: "style-loader!css-loader!postcss-loader!less-loader"
      },
      {
        test: /\.(ttf|eot|woff|woff2|otf|svg)/,
        loader: "file-loader?name=./fonts/[name].[ext]"
      },
      {
        test: /\.scss$/,
        loaders: [
          "style-loader",
          "css-loader?modules&localIdentName=[name]-[local]",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: "url-loader?limit=10000&name=./images/[name].[ext]"
      }
    ]
  },
  babel: {
    presets: ["react", "es2015"],
    plugins: ["transform-object-rest-spread"]
  },
  postcss: function() {
    return [autoprefixer({ browsers: ["> 1%", "IE 9"] }), precss];
  },
  ts: {
    transpileOnly: true,
    declaration: false,
    compilerOptions: {
      baseUrl: ".",
      paths: {
        "_/*": ["./src/*"]
      },
      target: "es6",
      jsx: "preserve",
      moduleResolution: "node",
      sourceMap: true
    },
    files: ["i-really-hope-you-dont-have-a-file-with-this-name"]
  }
};

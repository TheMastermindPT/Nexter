const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: {
    index: ["babel-polyfill", "./source/scripts/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "dist/scripts"),
    filename: "[name].js"
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "../styles/[name].css",
      chunkFilename: "../styles/[id].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"],
            plugins: ["transform-object-rest-spread"]
          }
        }
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    publicPath: "/source/scripts/"
  },
  devtool: "source-map"
};

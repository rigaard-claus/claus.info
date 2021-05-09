// Webpack v5
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader')

const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
    // libraryTarget: 'var',
    // library: 'EntryPoint',
    // umdNamedDefine: true,
    // libraryExport: 'default'
  },
  plugins: [
    new VueLoaderPlugin(),
    // new HtmlWebpackPlugin({
    //   title: "RigaardArt",
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
    ]
  }
}
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const env = process.env.NODE_ENV
const path = require('path')

module.exports = {
  mode: env || 'development',
  entry: { app: ['./src/assets/scss/app.scss', './src/assets/js/app.js'] },
  output: { path: path.resolve(__dirname, 'dist'), filename: '[contenthash:7].js' },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.html$/,
        use: [{ loader: "html-loader", options: { minimize: true } }]
      },
      {
        test: /\.sc|ass$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader", options: { importLoaders: 1 } },
          { loader: 'postcss-loader' },
          { loader: 'resolve-url-loader' },
          { loader: "sass-loader", options: { sourceMap: true } },
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: { name: 'fonts/[sha512:hash:base64:7].[ext]' }
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          // Image path: ./img/name.ext
          { loader: "url-loader", options: { name: "./img/[sha512:hash:base64:7].[ext]", limit: 2000 } },
          { loader: 'image-webpack-loader' },
        ],
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "[contenthash:7].css", chunkFilename: "[id].css" }),
    new CleanWebpackPlugin('dist/*', {}),
    new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      favicon: './src/assets/img/favicon.png',
      template: './src/index.html',
      filename: 'index.html'
    })
  ]
}

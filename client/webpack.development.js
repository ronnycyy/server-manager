const { join } = require('path');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

module.exports = {
  devServer: {
    contentBase: join(__dirname, '../dist'),
    hot: true,
    port: 3000
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      }
    ]
  },
  plugins: [
    new WebpackBuildNotifierPlugin({
      title: "My Webpack Project",
      // logo: path.resolve("./img/favicon.png"),
      suppressSuccess: true,
    })
  ]
}
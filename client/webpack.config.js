const { join, resolve } = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');

const callbak = (env, options) => {
  const mode = options.mode;
  const mergeConfig = require(`./webpack.${mode}.js`);

  const config = {
    entry: {
      app: join(__dirname, "./index.js")
    },
    output: {
      path: resolve(__dirname, '../dist'),
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.jpeg/,
          type: 'asset/inline'
        },
        {
          test: /\.(j|t)sx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react"
              ],
              plugins: [
                "@babel/plugin-transform-runtime",
                "@babel/plugin-syntax-dynamic-import",
                [
                  "@babel/plugin-proposal-decorators",
                  {
                    "legacy": true,
                    "loose": true
                  }
                ],
                "@babel/plugin-proposal-class-properties",
                [
                  "import",
                  {
                    libraryName: "antd",
                    libraryDirectory: "lib",
                    style: function (name) {
                      return `${name}/style/index.css`;  // 这样前端就不用手动引了，这里会按需引入每个antd组件的css
                    },
                  },
                ]
              ]
            }
          },
          exclude: /node_modules/
        },
      ]
    },
    plugins: [
      // 清除上次的dist
      new CleanWebpackPlugin(),
      // 处理模版
      new HtmlWebpackPlugin({
        filename: 'index.html',  // 相对于dist
        template: join(__dirname, '../index.html'),  // 相对于本路径
      })
    ]
  }

  return merge(config, mergeConfig);
}

module.exports = callbak;

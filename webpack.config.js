const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "app.js"), // 번들 작업할 파일
  output: {
    path: path.resolve(__dirname, "dist"), // 번들화 된 파일 경로
    filename: "bundle.js", // 파일 명
  },
  module: {
    rules: [
        {
            test: /\.jsx$/i,
            use: "babel-loader"
        },
        {
            test: /\.css/i,
            use: ["style-loader", "css-loader"]
        }
    ]
  },
  plugin: [
    new HtmlWebpackPlugin()
  ]
//   watch: true, // 자동 번들화 작업 여부
//   devServer: {
//     contentBase: path.resolve("./build"),
//     index: "index.html",
//     // 클라이언트 포트는 3000
//     port: 3001,
//     proxy: {
//       "/app": {
//         // 서버 포트는 3001
//         target: "https://prod.kcook-cake.com/",
//         changeOrigin: true,
//       },
//     },
//   },
};

// webpack.config.js 파일

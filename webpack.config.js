const path = require(`path`);

module.exports = {
  entry: {
    main: `./src/index.js`,
    cart: `./src/cart.js`
  },
  output: {
    filename: `[name].js`,
    path: path.resolve(__dirname, `dist`)
  },
  devtool: `source-map`,
  devServer: {
    contentBase: path.join(__dirname, `dist`),
    publicPath: `http://localhost:8080/`,
    hot: true,
    compress: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: `eslint-loader`,
        options: {}
      }
    ]
  }
};

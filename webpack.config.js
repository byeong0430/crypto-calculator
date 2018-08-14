const path = require('path');

// It moves all the required *.css modules in entry chunks into a separate CSS file
// So your styles are no longer inlined into the JS bundle,
// but in a separate CSS file (styles.css).
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// Reload changes made to html
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
  app: path.resolve(__dirname, 'src/js/'),
  build: path.resolve(__dirname, 'build/'),
  template: path.resolve(__dirname, 'src/index.html')
};

const env = process.env.NODE_ENV || 'development';

module.exports = {
  // Set environment
  mode: env,
  // Entry point
  entry: {
    app: path.join(paths.app, '/index.js')
  },
  output: {
    // [name] refers to the key name of entry
    filename: 'js/[name]-generated.js',
    path: paths.build,
    publicPath: '/'
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        // Use babel-loader for all jsx files
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // 'env' lets you specify an environment and only transpiles features that are missing in that environment.
            // 'stage-0' converts ES6 syntax to ES5 to be compatible for all (or most) browsers.
            // without 'react', this app doesn't understand what JSX is
            presets: ['env', 'stage-0', 'react']
          }
        }
      },
      {
        test: /\.scss|.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  devtool: env === 'production' ? 'cheap-source-map' : 'eval-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 3002,
    // the dev server is on port 3000 while express server is on port 3002
    // express routes are specifically for api calls
    // set up a proxy so that you have access to express server (port: 3002) from dev server
    proxy: {
      "/api": "http://localhost:3001"
    },
    // set historyApiFallback to true so that the app is served for any URL not just for /
    historyApiFallback: true,
    contentBase: paths.build,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    }
  },
  plugins: [
    // create a separate css file in build/ and add it to index.html
    new MiniCssExtractPlugin({
      filename: 'css/[name]-generated.css'
    }),
    // Apply changes in html immediately
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: paths.template,
      inject: true
    })
  ]
}
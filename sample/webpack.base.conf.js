var webpack = require('webpack');
var path = require('path');
var glob = require('glob');

const getEntries = function (globPath) {
  var entries = {}
  /**
   * 读取src目录,并进行路径裁剪
   */
  glob.sync(globPath).forEach(function (entry) {
    var tmp = entry.split('/').splice(-2)
    var moduleName = tmp[1].replace('.js', '');
    // ***************end***************
    entries[moduleName] = entry;

  });
  return entries;
}

module.exports = {
  context: path.resolve(__dirname, './', ''),
  entry: getEntries('./src/js/*.js'),
  output: {
    path: __dirname,
    filename: '[name].js',
    jsonpFunction: 'W'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
        query: {
          presets: ['es2015', 'stage-2']
        }
      },
      {
        loader: 'url-loader?limit=100000',
        test: /\.(png|woff|woff2|eot|ttf|svg)$/
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery",
      "window.$": "jquery",
      "window.jQuery": "jquery"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, './node_modules')
          ) === 0
        )
      }
    }),
  ]
}

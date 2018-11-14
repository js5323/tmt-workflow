var webpack = require('webpack');
var path = require('path');
var baseWebpackConfig = require('./webpack.base.conf.js');
var merge = require('webpack-merge')

module.exports = merge(baseWebpackConfig, {

	devtool: '#cheap-module-eval-source-map',

	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"development"'
			}
		}),
		// https://github.com/glenjamin/webpack-hot-middleware#installation--usage
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		// copy custom static assets
	],

});
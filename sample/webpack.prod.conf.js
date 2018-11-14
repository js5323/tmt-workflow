var webpack = require('webpack');
var path = require('path');
var baseWebpackConfig = require('./webpack.base.conf.js');
var merge = require('webpack-merge')

module.exports = merge(baseWebpackConfig, {


	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		})
	],

});
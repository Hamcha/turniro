/* eslint strict: 0 */
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');
const baseConfig = require('./webpack.config.common');

const config = Object.create(baseConfig);

config.devtool = 'source-map';

config.entry = './app/index';

config.output.publicPath = '/dist/';

config.module.loaders.push({
	test: /^((?!\.module).)*\.scss$/,
	loader: ExtractTextPlugin.extract(
		'style',
		'css',
		'sass'
	)
}, {
	test: /\.module\.scss$/,
	loader: ExtractTextPlugin.extract(
		'style',
		'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
		'sass'
	)
},{
	test: /^((?!\.module).)*\.css$/,
	loader: ExtractTextPlugin.extract(
		'style',
		'css'
	)
});

config.plugins.push(
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.DefinePlugin({
		'__DEV__': false,
		'process.env': {
			'NODE_ENV': JSON.stringify('production')
		}
	}),
	new webpack.optimize.UglifyJsPlugin({
		compressor: {
			screw_ie8: true,
			warnings: false
		}
	}),
	new ExtractTextPlugin('style.css', { allChunks: true })
);

config.target = webpackTargetElectronRenderer(config);

module.exports = config;
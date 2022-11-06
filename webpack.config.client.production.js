const path = require('path');
// const webpack = require('webpack');
const CWD = process.cwd();

const config = {
	mode: 'production',
	entry: [path.join(CWD, 'client/main.js')],
	output: {
		path: path.join(CWD, '/dist'),
		filename: 'bundle.js',
		publicPath: '/dist/',
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
		],
	},
};

module.exports = config;

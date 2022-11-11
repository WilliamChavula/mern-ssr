const path = require('path');
// const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const CWD = process.cwd();

const config = {
	name: 'server',
	externalsPresets: { node: true },
	externals: [nodeExternals()],
	entry: [path.join(CWD, 'server/server.js')],
	output: {
		path: path.join(CWD, '/dist/'),
		filename: 'server.generated.js',
		libraryTarget: 'commonjs2',
		publicPath: '/dist/',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
				use: 'file-loader',
			},
		],
	},
};

module.exports = config;

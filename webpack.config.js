
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.bundle.js'
	},
	module: {
		rules: [
			{ test: /\.(jsx|js)$/, use: 'babel-loader' },
			{ test: /\.(css|less)$/, use: [
				{loader: 'style-loader'}, 
				{
					loader: 'css-loader',
					options: {
						modules: true
					}
				}
			]},
		]
	},
	plugins: [
		new HtmlWebpackPlugin()
	]
}
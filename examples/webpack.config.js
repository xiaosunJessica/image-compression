
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
			{ 
				test: /\.js[x]?$/,
        exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-react'],
						plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties']
					}
				}
			},
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
		new HtmlWebpackPlugin({
			template: 'index.html'
		})
	]
}
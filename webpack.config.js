const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.ejs',
			templateParameters: {
				siteConfig: require('./src/site-config.json')
			},
			inject: 'head'
		}),
		new ESLintPlugin()
	]
}

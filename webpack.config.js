var path 		= require('path')
var publicPath 	= 'http://localhost:8050/public/'

/*module.exports = {
	entry: [
		'babel-polyfill',
		'./src/client.js'
	],
	output: {
		path: path.resolve(__dirname, './public'),
		filename: "bundle.js",
		publicPath
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				loader: "babel-loader",
				options: {
					presets:["env", "react"]
				}
			},
			{	
				test:/\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			}
		]
	},
	devServer: {
		headers: { 'Access-Control-Allow-Origin': '*' }
	}
}*/
/*
module.exports = {
	entry: [
		'./src/client.js'
	],
	output: {
		path: path.resolve(__dirname, './public'),
		filename: "bundle.js",
		publicPath: '/public/',
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				loader: "babel-loader",
				options: {
					presets:["env", "react"]
				}
			},
			{	
				test:/\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			}
		]
	},
	devServer: {
		headers: { 'Access-Control-Allow-Origin': '*' }
	}
}*/


module.exports = {
	entry: [
		'./src/client.js'
	],
	output: {
		path: path.resolve(__dirname, './public'),
		filename: "bundle.js",
		publicPath: publicPath
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				loader: "babel-loader",
				options: {
					presets:["env", "react"]
				}
			},
			{	
				test:/\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			}
		]
	},
	devServer: {
		headers: { 'Access-Control-Allow-Origin': '*' }
	}
}
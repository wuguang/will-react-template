const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports= merge(baseConfig,{
    mode:'production',
	module:{
		rules:[
			{
				test:/\.less$/,
				use:[
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'less-loader',

				]
			},
			{
				test:/\.css$/,
				use:[
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader'
				]
			}
		]
	},
	plugins:[
		//抽取css到独立文件
		new MiniCssExtractPlugin({ // 添加插件
			filename: '.assets/css/[name].[contenthash:8].css'
		}),
	]
})

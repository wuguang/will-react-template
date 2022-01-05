const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
//压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const pathResolve = filePath=> path.resolve(__dirname,filePath);
const glob = require('glob');

const PATHS = {
	src: pathResolve('../public')
}

let prodConfig = merge(baseConfig,{
    mode:'production',
	module:{
		rules:[
			{
				test:/\.less$/,
				use:[
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'less-loader'
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
		new PurgecssWebpackPlugin({
			paths: glob.sync(`${PATHS.src}/**/*`, {nodir: true})
		}),
		new MiniCssExtractPlugin({ // 添加插件
			filename: './assets/css/[name].[contenthash:8].css'
		}),
	],
	optimization: {
		minimize: true,
		minimizer: [
			//压缩css
			new OptimizeCssAssetsPlugin(),
			//压缩js
			new TerserPlugin()
		]
	},
})

module.exports = prodConfig;






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
		splitChunks: {
			chunks: 'async', // 有效值为 `all`，`async` 和 `initial`
			minSize: 20000, // 生成 chunk 的最小体积（≈ 20kb)
			minRemainingSize: 0, // 确保拆分后剩余的最小 chunk 体积超过限制来避免大小为零的模块
			minChunks: 1, // 拆分前必须共享模块的最小 chunks 数。
			maxAsyncRequests: 30, // 最大的按需(异步)加载次数
			maxInitialRequests: 30, // 打包后的入口文件加载时，还能同时加载js文件的数量（包括入口文件）
			enforceSizeThreshold: 50000,
			cacheGroups: { // 配置提取模块的方案
			  defaultVendors: {
				test: /[\/]node_modules[\/]/,
				priority: -10,
				reuseExistingChunk: true,
			  },
			  default: {
				minChunks: 2,
				priority: -20,
				reuseExistingChunk: true,
			  },
			},
		},
	
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






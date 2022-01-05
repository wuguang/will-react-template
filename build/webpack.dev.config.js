const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

let devConfig = merge(baseConfig,{
	mode:'development',
	devtool:'eval-cheap-module-source-map',
	devServer:{
		historyApiFallback:true,
		static:[{
			directory: path.join(__dirname, '../public'),
			// Can be:
			// serveIndex: {} (options for the `serveIndex` option you can find https://github.com/expressjs/serve-index)
			//serveIndex: true,
		}],
		compress:true,
		port:3030,
		open: {
			app: {
				name: 'chrome',
				arguments: ['--incognito', '--new-window'],
			},
		}
	}
});

//正常导出
//module.exports = devConfig;


//loader 耗时分析导出
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
module.exports = (env, argv) =>{
	return smp.wrap(devConfig);
}






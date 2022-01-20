const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ESLintPlugin = require('eslint-webpack-plugin');
const esConfig = require('../.eslintrc');
const pathResolve = filePath=> path.resolve(__dirname,filePath);

let eslintOptions = {
	overrideConfig:{
		globals:{
			//	要在配置文件中配置全局变量,对于每个全局变量键，将对应的值设置为"writable"以允许重写变量，或"readonly"不允许重写变量
			//	"Babel":"writable",
			//  "React": "writable"
		}
	}
};


	let devConfig = merge(baseConfig,{
		mode:'development',
		devtool:'eval-cheap-module-source-map',
		plugins:[
			new ESLintPlugin(eslintOptions)
		],
		devServer:{
			historyApiFallback:true,
			static:[{
				directory: path.join(__dirname, '../public'),
				// Can be:
				// serveIndex: {} (options for the `serveIndex` option you can find https://github.com/expressjs/serve-index)
				// serveIndex: true,
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
	}
);

// 正常导出
// module.exports = devConfig;


// loader 耗时分析导出
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
module.exports = (env, argv) =>{
	return smp.wrap(devConfig);
}




/*
	module:{
        rules:[{
            test:/\.(tsx?|jsx?)$/,
			include: pathResolve('../src'),
			exclude: /node_modules/,
            use:[{
                    loader:'thread-loader',
                    options:{
                        worker:cupNum?cupNum-1:1,
                    }
                },
                {
                    loader:'babel-loader',
                    options:{
						//开启babel的缓存
						cacheDirectory:true,
                        presets:[
                            ['@babel/preset-env',{
                                // useBuiltIns: usage 会根据配置的浏览器兼容，实现了按需添加
                                useBuiltIns: 'usage',
                                corejs: 3,
                                //不以commonjs打包，方便tree-shaking
                                modules: false,
                            }],
                            '@babel/preset-react',
                            '@babel/preset-typescript'
                        ],
                        plugins: [
                            ["@babel/plugin-proposal-decorators",{legacy:true}],
                            ["@babel/plugin-proposal-class-properties"],
                            //["@babel/plugin-syntax-dynamic-import"],
                        ]
                    }
            }]
        }
	},
*/




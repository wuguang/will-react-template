const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pathResolve = filePath=> path.resolve(__dirname,filePath);

module.exports = {
	context: __dirname,
    entry:pathResolve('../src/app.tsx'),
    output:{
        //contenthash 真实内容hash,注释之类不影响输出结果
        filename:'[name].[contenthash:8].js',
        chunkFilename:'chunk/name.[contenthash:8].chunk.js',
        path:pathResolve('../dist'),
        clean:true
    },
	devtool:'eval-cheap-module-source-map',
    module:{
        rules:[{
            test:/\.(tsx?|jsx?)$/,
			include: pathResolve('../src'),
			exclude: /node_modules/,
            use:[{
                loader:'babel-loader',
                options:{
                    presets:[
                        ['@babel/preset-env'/*,{
							// useBuiltIns: usage 会根据配置的浏览器兼容，实现了按需添加
							// pollfill的一些配置
							useBuiltIns: 'usage',
							corejs: {
								"version": 3, // 使用core-js@3
								"proposals": true,
							},
							//"modules": true
						}*/],
                        '@babel/preset-react',
                        '@babel/preset-typescript'
                    ],
					plugins: [
						/*
						["@babel/plugin-proposal-decorators", { legacy: true }],
						["@babel/plugin-proposal-class-properties", { loose: true }]
						*/
					]
                }
            }]
        },{
            test:/\.less$/,
			exclude: /node_modules/,
            use:[
				'style-loader',
				'css-loader',
				'postcss-loader',
				'less-loader'
			]
        },
		{
            test:/\.css$/,
            use:[
				'style-loader',
				'css-loader',
				'postcss-loader'
			]
        },{
            test:/\.(jpe?g|png|gif)$/i,
            type:'asset',
            generator:{
                filename:"assets/imgs/[name].[contenthash:8][ext]"
            },
            parser:{
                dataUrlCondition:{
                    maxSize:20*1024
                }
            }
        },{
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
            type:'asset',
            generator:{
                filename:'assets/fonts/[name].[contenthash:8][ext]'
            },
            parser:{
                dataUrlCondition:{
                    maxSize:10*1024
                }
            }
        }]
    },

    plugins:[
		new require('postcss-preset-env'),
        new HtmlWebpackPlugin({
            template:pathResolve('../public/index.html'),
            inject:true,
        })
    ],
    resolve:{
		//与tsconfig是否配置，似乎无关
        alias:{
			"@":pathResolve('../src'),
            '@pages':pathResolve('../src/pages'),
            '@comModules':pathResolve('../src/comModules'),
            "@public":pathResolve("../public"),
            '@gComponents':pathResolve('../src/comModules/gComponents'),
            '@gHooks':pathResolve('../src/comModules/gHooks'),
            '@store':pathResolve('../src/comModules/store'),
            '@bizFuns':pathResolve('../src/comModules/bizFuns'),
            '@config':pathResolve('../src/comModules/config'),
            '@utils':pathResolve('../src/comModules/utils')
        },
        extensions:['.tsx','.ts','.jsx','.js'],
		//webpack 解析模块时应该搜索的目录
		modules: [pathResolve('../src'), 'node_modules'],
    },
	/*
	//cdn 模式引入的文件，编码内部可以用 import $ from 'jquery'，使用,
	externals: {
		jquery: 'jQuery',
	}
	*/
}

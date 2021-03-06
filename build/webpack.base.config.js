const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pathResolve = filePath=> path.resolve(__dirname,filePath);
const cupNum = require('os').cpus();

module.exports = {
	context: __dirname,
    entry:pathResolve('../src/app.tsx'),
    output:{
        // contenthash 真实内容hash,注释之类不影响输出结果
        filename:'[name].[contenthash:8].js',
        chunkFilename:'chunk/name.[contenthash:8].chunk.js',
        path:pathResolve('../dist'),
        clean:true
    },
    module:{
        rules:[{
            test:/\.(tsx?|jsx?)$/,
			include: pathResolve('../src'),
			exclude: /node_modules/,
            use:[/* {
                    loader:'thread-loader',
                    options:{
                        worker:cupNum?cupNum-1:1,
                    }
                },
                */{
                    loader:'babel-loader',
                    options:{
						// 开启babel的缓存
						cacheDirectory:true,
                        presets:[
                            ['@babel/preset-env',{
                                // useBuiltIns: usage 会根据配置的浏览器兼容，实现了按需添加
                                useBuiltIns: 'usage',
                                corejs: 3,
                                // 不以commonjs打包，方便tree-shaking
                                modules: false,
                            }],
                            '@babel/preset-react',
                            '@babel/preset-typescript'
                        ],
                        plugins: [
                            ["@babel/plugin-proposal-decorators",{legacy:true}],
                            ["@babel/plugin-proposal-class-properties"],
                            // ["@babel/plugin-syntax-dynamic-import"],
                        ]
                    }
            }]
        },{
            test:/\.less$/,
			include: pathResolve('../public'),
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
			include: pathResolve('../public'),
			exclude: /node_modules/,
            use:[
				'style-loader',
				'cache-loader',
				'css-loader',
				'postcss-loader'
			]
        },{
            test:/\.(jpe?g|png|gif)$/i,
            type:'asset',
			include: pathResolve('../public'),
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
			include: pathResolve('../public'),
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
        // eslint-disable-next-line
        new require('postcss-preset-env'),
        new HtmlWebpackPlugin({
            template:pathResolve('../public/index.html'),
            inject:true,
            // 考虑下复制iconde 的事
        })
    ],
    resolve:{
		// 与tsconfig是否配置，似乎无关
        alias:{
            '@pages':pathResolve('../src/pages'),
            '@comModules':pathResolve('../src/comModules'),
            "@public":pathResolve("../public"),
            '@gComponents':pathResolve('../src/comModules/gComponents'),
            '@gHooks':pathResolve('../src/comModules/gHooks'),
            '@store':pathResolve('../src/comModules/store'),
            '@layout':pathResolve('../src/layout'),
            '@bizFuns':pathResolve('../src/comModules/bizFuns'),
            '@config':pathResolve('../src/comModules/config'),
            '@utils':pathResolve('../src/comModules/utils')
        },
        extensions:['.tsx','.ts','.jsx','.js','.jpg','.jpeg','.png','.gif'],
		// webpack 解析模块时应该搜索的目录
		modules: [pathResolve('../src'),pathResolve('../public'),'node_modules'],
    },
	// html模板里 以cdn 模式引入的文件，编码内部可以用 import $ from 'jquery'，使用,
	externals: {
		jquery: 'jQuery',
	},
	cache: {
		// cache的生成方式
		type: 'filesystem',
	}
}

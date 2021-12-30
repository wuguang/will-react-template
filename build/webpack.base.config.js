const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pathResolve = filePath=> path.resolve(__dirname,filePath);
module.exports = {
    entry:pathResolve('../src/app.tsx'),
    output:{
        //contenthash 真实内容hash,注释之类不影响输出结果
        filename:'[name].[contenthash:8].js',
        chunkFilename:'chunk/name.[contenthash:8].chunk.js',
        path:pathResolve('../dist'),
        //publicPath:'./',
        clean:true
    },
    module:{
        rules:[{
            test:/\.css$/,
            use:['style-loader','css-loader']
        },{
            test:/\.(jpe?g|png|gif)$/i,
            type:'asset',
            generator:{
                filename:"asset/imgs/[name].[contenthash:8][ext]"
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
                filename:'asset/fonts/[name].[contenthash:8][ext]'
            },
            parser:{
                dataUrlCondition:{
                    maxSize:20*1024
                }
            }
        }]
    },
    
    plugins:[
        new HtmlWebpackPlugin({
            template:pathResolve('../template/index.html'),
            inject:true,
        })
    ]
    
    /*
    rules:[],
    resolve:{

    }
    */
}
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
        publicPath:'./',
        clean:true
    },
    module:{
        rules:[{
            test:/\.css$/,
            use:'css-loader'
        }]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:pathResolve('../template/index.html')
        })
    ]
    /*
    rules:[],
    resolve:{

    }
    */
}
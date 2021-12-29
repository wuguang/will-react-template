const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const path = require('path');

module.exports= merge(baseConfig,{
    mode:'development',
    devServer:{
        static:[{
            directory: path.join(__dirname, '../dist'),
        }],
        compress:true,
        port:8080,
        //historyApiFallback: true,
        open: {
            app: {
                name: 'chrome',
                arguments: ['--incognito', '--new-window'],
            },
        }
    }
})
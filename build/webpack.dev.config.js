const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const path = require('path');

module.exports= merge(baseConfig,{
    mode:'development',
    devServer:{
        historyApiFallback:true,
        static:[{
            directory: path.join(__dirname, '../public'),
            
            // Can be:
            // serveIndex: {} (options for the `serveIndex` option you can find https://github.com/expressjs/serve-index)
            //serveIndex: true,
        }],
        compress:true,
        port:8080,
        open: {
            app: {
                name: 'chrome',
                arguments: ['--incognito', '--new-window'],
            },
        }
    }
})
let {merge} = require('webpack-merge');
let baseConfig = require('./webpack.base.config');


module.exports= merge(baseConfig,{
    mode:'development'
})
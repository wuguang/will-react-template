const webpack = require('webpack');
const devConfig = require('../build/webpack.dev.config');
const prodConfig = require('../build/webpack.prod.config');


let compiler = webpack(devConfig);

let  arguments = process.argv.splice(2);

console.log(arguments);

compiler.run();

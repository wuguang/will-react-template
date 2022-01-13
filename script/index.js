
let baseConfig = require('../build/webpack.base.config.js');

const webpack = require('webpack');
const devConfig = require('../build/webpack.dev.config.js');
const prodConfig = require('../build/webpack.prod.config.js');


let compiler = webpack(devConfig);
let  arguments = process.argv.splice(2);

console.log(arguments);

compiler.run();

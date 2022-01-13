let {responseTemplate} = require('./utils');

module.exports = {
    '/login':{
        method:'post',
        responseFn:params=>{
            return{
                ...responseTemplate,
                data:{
                    result:true
                }
            }
        }
    },
    '/register':{
        method:'post',
        responseFn:params=>{
            return{
                ...responseTemplate,
                data:{
                    result:true
                }
            }
        }
    }
};


//让ts 认为是个esModule,避免命名报错
export {}
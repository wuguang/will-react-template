let {responseTemplate} = require('../common/utils');

let postApi = {
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
}

let getApi = {
    '/login':{
        method:'get',
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
        method:'get',
        responseFn:params=>{
            return{
                ...responseTemplate,
                data:{
                    result:true
                }
            }
        }
    }
}


module.exports = {
    postApi,
    getApi
};


//让ts 认为是个esModule,避免命名报错
export {}
const express = require('express');
const app = express();
const config = require('../../config');
const port = config.mockPort;
const killPort = require('kill-port');
const bodyParser = require('body-parser');
const {postApi,getApi} = require('./apiList/index');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const handleRequest = (res,item,param)=>{
    let {responseFn,status} = item;
    let responseData = responseFn(param);
    res.status(status||200).send(responseData);
}

const appRoute = ()=>{
    // post 方法处理函数
    Object.entries(postApi).forEach(([path,item]:any)=>{
        app.post(path,(req,res)=>{
            handleRequest(res,item,req.body);
        });
    });

    // get 方法处理函数
    Object.entries(getApi).forEach(([path,item]:any)=>{
        app.get(path,(req,res)=>{
            handleRequest(res,item,req.body);
        });
    });
}

app.get('/',(req,res)=>{
    res.send('hello, this is a get request~~');
})

app.post('/',(req,res)=>{
    res.send('hello, this is a post request~~');
})


app.listen(port,()=>{
    console.log(`Mock server is running at http://localhost:${port}`);
});
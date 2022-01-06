

import React,{Suspense} from 'react';
import {Route,Switch,Redirect,HashRouter,BrowserRouter} from 'react-router-dom';
import config from '@config';

const routerConfig = {
    '/login':{
        path:'@pages/login',
        isExact:true,
        layout:'outLayout'
    },
    '/register':{
        path:'@page/register',
        isExact:true,

    },
    '/auth':{
        path:'@page/auth',
        isExact:false,
        children:[
            //动态加载...
        ]
    }
};

const Router = config.routerType === 'HashRouter'?HashRouter:BrowserRouter;
const getComponent = (path)=>{
    import(/* webpackChunkName: "login" */'@pages/login');
};

let routeArr = [];


const getRoute = ()=>{
    for(let k in routerConfig){

    }
}


export default ()=>{
    return <Router>
        <Supense fallback={'加载中...'}>
            <Switch>
                <Route exact key="/login" path="/login" component={getComponent()} />
                <Route exact key="/register" path="/register" component={BizMain} />
                <Route exact key="/" path="/"  render={ ()=><Redirect to="/login"/>} />
            </Switch>
        </Supense>
    </Router>
}
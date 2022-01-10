

import React,{Suspense,useEffect,useCallback} from 'react';
import {Route,HashRouter,BrowserRouter,Routes,Link,Navigate} from 'react-router-dom';
import config from '@config/index';
import MainLayout from '../layout/mainLayout';
import AuthLayout from '../layout/authLayout';

const Login= React.lazy(()=>import(/* webpackChunkName: "login" */'@pages/login'));
const Register = React.lazy(()=>import(/* webpackChunkName: "register" */'@pages/register'));

interface RouterConfigProps {
    routes:RouteItemProps[];
} 

const routerConfig:RouterConfigProps = {
    routes:[
        {
            path:'/',
            component:Login,
            exact:true
        },
        {
            path:'/login',
            component:Register,
            exact:true
        },
        {
            path:'/register',
            component:Register,
            exact:true
        },
        {
            path:'/auth',
            component:Register,
            exact:true,
            routes:[
                {
                    path:'/auth/market/marketPage01',
                    component:'@pages/auth/market/marketPage01',
                    exact:true
                },
                {
                    path:'/auth/product/productPage01',
                    component:'@pages/auth/product/productPage01',
                    exact:true
                }
            ]
        }
    ]
};

/*
{
    path:'*',
    navigate:'/login',
    //没有任何匹配时跳转到/login页面
    exact:false
} 
*/

export default ()=>{
    const Router = config.routerType === 'HashRouter'?HashRouter:BrowserRouter;
    const getRoutes = useCallback((routes:RouteItemProps[])=>{
        let routeItemArr:any = [];
        routes.forEach(({component,path,navigate})=>{
            if(component){
                //magic comment
                ///* webpackChunkName: "[request]" */
                let ComponentName = React.lazy(()=>import(/* webpackChunkName: "[request]" */`${component}`));
                /*
                routeItemArr.push(<Route key={path} path={path} element={
                    <React.Suspense fallback={<>loading...</>}>
                        <ComponentName02 />
                    </React.Suspense>
                } />);
                */

                let ComponentName02 = component;
                routeItemArr.push(<Route key={path} path={path} element={
                    <React.Suspense fallback={<>loading...</>}>
                        <ComponentName02 />
                    </React.Suspense>
                } />);
            }else if(navigate){
                routeItemArr.push(<Route  key={path}  path="*" element={<Navigate to={navigate} />}  />);
            }
        });

        return <Routes>
    
            <Route key="login" path="login" element={
                <React.Suspense fallback={<>loading...</>}>
                    <Login />
                </React.Suspense>
            } />

            <Route key="register" path="register" element={
                <React.Suspense fallback={<>loading...</>}>
                    <Register />
                </React.Suspense>
            } />

        </Routes>;
    },[]);


    return <Router>
        {getRoutes(routerConfig.routes)}
    </Router>
}
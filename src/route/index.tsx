

import React,{Suspense,useEffect,useCallback} from 'react';
import styled from 'styled-components';
import {Route,HashRouter,BrowserRouter,Routes,Link,Navigate,Outlet} from 'react-router-dom';
import config from '@config/index';

//import 动态导入问题，此处component路径不能动态配置,需写全
//手动写magic comments 不需要插件，节省编译时间
//见 https://webpack.js.org/api/module-methods/#dynamic-expressions-in-import

const MenuLayout = React.lazy(()=>import(/* webpackChunkName: "menuLayout" */'./menuLayout'));
const Login= React.lazy(()=>import(/* webpackChunkName: "login" */'@pages/login'));
const Register = React.lazy(()=>import(/* webpackChunkName: "register" */'@pages/register'));
const AuthLayout = React.lazy(()=>import(/* webpackChunkName: "authLayout" */'@pages/auth'));
const MarketPage01 = React.lazy(()=>import(/* webpackChunkName: "marketPage01" */'@pages/auth/market/marketPage01/marketPage01'));
const ProductPage01 = React.lazy(()=>import(/* webpackChunkName: "productPage01" */'@pages/auth/product/productPage01/productPage01'));

interface RouterConfigProps {
    routes:RouteItemProps[];
} 

const routerConfig:RouterConfigProps = {
    routes:[
        {
            path:'/',
            component: MenuLayout,
            children:[
                {
                    path:'/login',
                    isIndex:true,
                    component:Login   
                },
                {
                    path:'/register',
                    component:Register 
                },
                {
                    path:'/auth',
                    component:AuthLayout,
                    children:[
                        {
                            path:'/auth/market/marketPage01',
                            component:MarketPage01
                        },
                        {
                            path:'/auth/product/productPage01',
                            component:ProductPage01
                        }
                    ]
                },
                {
                    path:'*',
                    component:Login,
                    //没有任何匹配时跳转到/login页面
                }
            ]
        }
    ] 
};

export default ()=>{

    const getComponent = (Comp)=>{
        return <React.Suspense fallback={<>loading...</>}>
            <Comp />
        </React.Suspense>
    }

    const getRoutes = useCallback((childrenRoutes:RouteItemProps[])=>{
        let routeItemArr:any = [];
        childrenRoutes.forEach(({component,path,children,isIndex})=>{
            //没有子路由
            if(!children || children.length === 0){
                let routeItem = isIndex?<Route key={path} index element={ getComponent(component)} />:<Route key={path} path={path} element={ getComponent(component)} />;
                routeItemArr.push(routeItem);
            }else if(children?.length>0){
                //有子路由, route嵌套route
                routeItemArr.push(<Route key={path} path={path} element={getComponent(component)}>
                    {getRoutes(children)}
                </Route>);
            }
        });
        return routeItemArr;
    },[]);

    const AppRouter = config.routerType === 'HashRouter'?HashRouter:BrowserRouter;
    
    return <AppRouter>
        <Routes>
            {getRoutes(routerConfig.routes)}
        </Routes>
    </AppRouter>
}

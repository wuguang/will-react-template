

import React,{Suspense} from 'react';
import {Route,HashRouter,BrowserRouter,Routes,Link,Navigate} from 'react-router-dom';
import config from '@config/index';
import MainLayout from '../layout/mainLayout';
import AuthLayout from '../layout/authLayout';

import Login from '@pages/login';
import Register from '@pages/register';


interface RouterConfigProps {
    routes:RouteItemProps[];
} 

const routerConfig:RouterConfigProps = {
    routes:[
        {
            path:'/',
            component:'@pages/login',
            exact:true
        },
        {
            path:'/login',
            component:'@pages/login',
            exact:true
        },
        {
            path:'/register',
            component:'@pages/register',
            exact:true
        },
        {
            path:'/auth',
            component:'@pages/auth',
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
        },
        {
            path:'*',
            navigate:'/login',
            //没有任何匹配时跳转到/login页面
            exact:false
        }
    ]
};

const Router = config.routerType === 'HashRouter'?HashRouter:BrowserRouter;
const getComponent = (componentPath):Function=>{
    return React.lazy(()=>import(`${componentPath}`));
    ///*webpackChunkName:[request]*/
}
const getRoutes = (routes:RouteItemProps[])=>{
    let routeItemArr:any = [];
    routes.forEach(routeItem=>{
        if(routeItem.component){
            routeItemArr.push(<Route key={routeItem.path} path={routeItem.path} element={getComponent(routeItem.component)()} />);
        }else if(routeItem.navigate){
            routeItemArr.push(<Route  key={routeItem.path}  path="*" element={<Navigate to={routeItem.navigate} />}  />);
        }
    });
    return <Routes>
        {routeItemArr}
    </Routes>;
}

export default ()=>{
    return <Router>
        <Suspense fallback={'加载中...'}>
            {getRoutes(routerConfig.routes)}
        </Suspense>
    </Router>
}

/*


<Routes>
                <Route  key='/login' path='/login' element={<Login/>} />
                <Route  key='/register' path='/register' element={<Register/>} />
                <Route  key='noMatch' path='*' element={<Navigate to='/login' />}  />
            </Routes>
<Routes>
    <Route  key='/login' path='/login' element={import('@pages/login')} />
</Routes>
*/

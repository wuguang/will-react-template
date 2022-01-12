

import React,{Suspense,useEffect,useCallback} from 'react';
import styled from 'styled-component';
import {Route,HashRouter,BrowserRouter,Routes,Link,Navigate,Outlet} from 'react-router-dom';
import config from '@config/index';
//import 动态导入问题，此处component路径不能动态配置,需写全
//见 https://webpack.js.org/api/module-methods/#dynamic-expressions-in-import
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
            path:'login',
            component:Login,
            exact:true
        },
        {
            path:'register',
            component:Register,
            exact:true
        },
        {
            path:'auth',
            component:AuthLayout,
            exact:true,
            routes:[
                {
                    //会拼上父级的路径
                    path:'/market/marketPage01',
                    component:MarketPage01,
                    exact:true
                },
                {
                    path:'/product/productPage01',
                    component:ProductPage01,
                    exact:true
                }
            ]
        },
        {
            path:'*',
            component:'/login',
            //没有任何匹配时跳转到/login页面
        } 
    ],
    
};



function MenuLayout() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="login">Login</Link>
            </li>
            <li>
              <Link to="register">Register</Link>
            </li>
            <li>
              <Link to="auth">AuthLayout</Link>
            </li>
            <li><Link to="/auth/market/marketPage01">marketPage01</Link></li>
            <li><Link to="/auth/product/productPage01">productPage01</Link></li>
            <li>
              <Link to="/nothing-here">Nothing Here --- to login</Link>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
    );
  }

export default ()=>{

    const getComponent = (Comp)=>{
        return <React.Suspense fallback={<>loading...</>}>
            <Comp />
        </React.Suspense>
    }
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<MenuLayout />}>
                <Route path="path" element={getComponent(Login)} />
                <Route path="register" element={getComponent(Register)} />
                <Route path="auth" element={getComponent(AuthLayout)} />
                <Route path="*" element={getComponent(Login)} />
            </Route>
        </Routes>
    </BrowserRouter>
}


/*   

    const Router = config.routerType === 'HashRouter'?HashRouter:BrowserRouter;
    const getComponent = (Comp)=>{
        return <React.Suspense fallback={<>loading...</>}>
            <Comp />
        </React.Suspense>
    }

    const getRoutes = useCallback((routesArr:RouteItemProps[])=>{
        let routeItemArr:any = [];
        routesArr.forEach(({component,path,routes},index)=>{
            let ComponentName = component;
            //没有子路由
            if(!routes || routes.length === 0){
                routeItemArr.push(<Route key={path} path={path} element={
                    <React.Suspense fallback={<>loading...</>}>
                        <ComponentName />
                    </React.Suspense>
                } />);
            }else if(routes?.length>0){
                
                //有子路由
                routeItemArr.push(<Route key={path} path={path} element={
                    <React.Suspense fallback={<>loading...</>}>
                        <ComponentName />
                    </React.Suspense>
                }>
                    {getRoutes(routes)}
                </Route>);
                
                //routeItemArr.push(<Route  key={path}  path="*" element={<Navigate to={navigate} />}  />);
            }
        });

        return <Route path="/" element={MenuLayout}>
            {routeItemArr}
        </Route>
    },[]);


<Route path="/" element={
    <React.Suspense fallback={<>loading...</>}>
        <Login />
    </React.Suspense>
} /> 
<Route path="/register" element={
    <React.Suspense fallback={<>loading...</>}>
        <Register />
    </React.Suspense>
} /> 
<Route path="*" element={<Navigate to={'/'} />}  />
<Route path="*" element={<NoMatch />} />
<Routes>
    <Route index={true} key="login" path="/login" element={
        <React.Suspense fallback={<>loading...</>}>
            <Login />
        </React.Suspense>
    } />

    <Route key="register" path="/register" element={
        <React.Suspense fallback={<>loading...</>}>
            <Register />
        </React.Suspense>
    } />
</Routes>
*/



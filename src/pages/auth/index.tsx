
import React from 'react';
import {  Outlet } from "react-router-dom";

const AuthIndex:React.FC = (props)=>{
    // 权限检测
    return <div>
        <div> I am auth page  layout  behind is pageContent ~~ </div>
        <Outlet />
    </div>
}

export default AuthIndex;

import React from 'react';
import {  Outlet } from "react-router-dom";

const AuthIndex:React.FC = (props)=>{
    return <div>
        <div> I am auth page ~~ </div>
        <Outlet />
    </div>
}

export default AuthIndex;
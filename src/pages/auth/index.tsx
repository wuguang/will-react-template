
import React from 'react';

const AuthIndex:React.FC = (props)=>{
    return <div>
        <div> I am auth page ~~ </div>
        <div>{props.children}</div>
    </div>
}

export default AuthIndex;
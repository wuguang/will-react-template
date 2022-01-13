import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const MenuTag = styled.div`
    width:100%;
    height:30px;
    background: #e8e8e8;

    nav>ul{
        display: flex;
        margin: 0;
        padding:0;
        list-style:none;
    }

    nav>ul>li{
        list-style:none；
        height: 30px;
        line-height:30px;
        padding:0 10px;
        font-size:12px;
    }
    nav>ul>li a{
        color:#738591;
    }
    nav>ul>li a:hover{
        color:#eb6e00;
    }
`

export default function MenuLayout() {
	return (
		<MenuTag>
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
					<li>
						<Link to="/auth/market/marketPage01">marketPage01</Link>
					</li>
					<li>
						<Link to="/auth/product/productPage01">
							productPage01
						</Link>
					</li>
					<li>
						<Link to="/nothing-here">
							No-Match
						</Link>
					</li>
				</ul>
			</nav>
			<Outlet />
		</MenuTag>
	);
}

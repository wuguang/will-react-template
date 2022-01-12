import * as React from 'react';
import {Link,Outlet} from 'react-router-dom';
import styled from 'styled-components';

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

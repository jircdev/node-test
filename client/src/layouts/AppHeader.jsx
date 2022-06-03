import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Header } from 'antd/lib/layout/layout';
import { startLogout } from '../actions/auth';
import { clearStore } from '../actions/ui';
import history from '../helpers/history';
import { userRoutes } from '../router/routes';
import { parseJwt } from '../helpers/parse-jwt';

export const { role } = parseJwt(sessionStorage.token);

export const AppHeader = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    setRoutes(userRoutes(isLoggedIn));
  }, [isLoggedIn]);

  const handleClick = ({ key }) => {
    if (key === '/logout') {
      dispatch(startLogout());
      clearStore(dispatch);
      history.push('/home');
    }
  };

  return (
    <Header>
      <div className='--layout-header__logo'>
        <div className='--app__logo'>Whatever App</div>
      </div>
      <Menu theme='dark' mode='horizontal' selectedKeys={[pathname]} onClick={handleClick}>
        {routes.map((route) =>
          route.scope === 'menu' ? (
            <Menu.Item key={route.path}>
              <Link to={route.path}>{route.name}</Link>
            </Menu.Item>
          ) : (
            <SubMenu key={route.key} title={route.name}>
              {route.children.map((child) => (
                <Menu.Item key={child.key}>
                  <Link to={child.path}>{child.name}</Link>
                </Menu.Item>
              ))}
            </SubMenu>
          )
        )}
      </Menu>
    </Header>
  );
};

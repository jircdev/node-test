import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userRoutes } from './routes';
import { NotFound } from '../components/pages';

export const AppRouter = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [routes, setRoutes] = useState([]);
  let completeRouted = false;

  useEffect(() => {
    setRoutes(userRoutes(isLoggedIn));
  }, [isLoggedIn]);

  return (
    <Switch>
      {routes.map((route, i) => {
        if (routes.length - 1 === i) {
          completeRouted = true;
        }
        if (route.scope === 'menu') {
          if (route.redirect) {
            return <Redirect key={route.key} to={route.pathTo} />;
          }
          return <Route key={route.key} path={route.path} component={route.component} />;
        } else {
          return (
            <Route key={route.key} path={route.path}>
              <Switch>
                {route.children.map((child) => (
                  <Route key={route.key} path={child.path}>
                    {child.component}
                  </Route>
                ))}
              </Switch>
            </Route>
          );
        }
      })}
      {completeRouted && <Route component={NotFound} />};
    </Switch>
  );
};

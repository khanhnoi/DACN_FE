import React, { Suspense, lazy, useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AuthenticatedRoutes, UnauthenticatedRoutes } from "./configs/router";
import axios from "axios";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";
// import "./css/index.css";
import "./assets/styles/index.scss";
import "antd/dist/antd.compact.css";
import "tabler-react/dist/Tabler.css";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

const Components = {};
for (const c of AuthenticatedRoutes) {
  Components[c.component] = lazy(() => import(`./pages/` + c.component));
}

//home, login, logout
for (const c of UnauthenticatedRoutes) {
  Components[c.component] = lazy(() => import("./pages/" + c.component));
}

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isSignedIn);
  console.log("isAuthenticated: " + isAuthenticated);
  return (
    <Router history={history}>
      <Switch>
        {UnauthenticatedRoutes.map((c) => {
          const C = Components[c.component];
          return (
            <Route
              key={c.path}
              exact={c.isExact}
              path={c.path}
              render={(props) => (
                <PublicRoute isAuthenticated={isAuthenticated}>
                  <Suspense fallback={<Loading />}>
                    <C {...props} isAuthenticated={isAuthenticated} />
                  </Suspense>
                </PublicRoute>
              )}
            />
          );
        })}
        {AuthenticatedRoutes.map((c) => {
          const C = Components[c.component];
          return (
            <Route
              key={c.path}
              exact
              path={c.path}
              render={(props) => (
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Suspense fallback={<Loading />}>
                    <C {...props} isAuthenticated={isAuthenticated} />
                  </Suspense>
                </PrivateRoute>
              )}
            />
          );
        })}
        <Route
          render={() => (
            <div>
              {isAuthenticated ? (
                <Redirect to="/cart" />
              ) : (
                <Redirect to="/home" />
              )}{" "}
            </div>
          )}
        />
      </Switch>
    </Router>
  );
}

export default App;

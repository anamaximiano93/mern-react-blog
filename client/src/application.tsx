import React, { useEffect, useReducer, useState } from "react";
import { Route, Switch, RouteChildrenProps } from "react-router-dom";
import routes from "./config/routes";
import {
  UserContextProvider,
  initialUserState,
  userReducer,
} from "./contexts/user";
import LoadingComponent from "./components/Loading";
import AuthRoute from "./components/AuthRoute";
import { Validate } from "./modules/auth";
import logging from "./config/logging";

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const [loading, setLoading] = useState<Boolean>(true);

  /*  */

  const [authStage, setAuthStage] = useState<string>(
    "Checandooo localstorage....."
  );

  useEffect(() => {
    setTimeout(() => {
      CheckLocalStorageForCredentials();
    }, 1000);
  }, []);

  const CheckLocalStorageForCredentials = () => {
    setAuthStage("Checando a crendencial....");

    const fire_token = localStorage.getItem("fire_token");

    if (fire_token == null) {
      userDispatch({ type: "logout", payload: initialUserState });
      setAuthStage("Credencial não encontrada :(");
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      return Validate(fire_token, (error, user) => {
        if (error) {
          logging.error(error);
          setAuthStage("Usuario não valido, fechando login...");
          userDispatch({ type: "logout", payload: initialUserState });
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        } else if (user) {
          setAuthStage("Usuario Autenticado");
          userDispatch({ type: "login", payload: { user, fire_token } });
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      });
    }
  };

  const userContextValues = {
    userState,
    userDispatch,
  };

  if (loading) {
    return <LoadingComponent>{authStage}</LoadingComponent>;
  }

  return (
    <UserContextProvider value={userContextValues}>
      <Switch>
        {routes.map((route, index) => {
          if (route.auth) {
            return (
              <Route
                key={index}
                exact={route.exact}
                path={route.path}
                render={(routeProps: RouteChildrenProps<any>) => (
                  <AuthRoute>
                    <route.component {...routeProps} />
                  </AuthRoute>
                )}
              />
            );
          }
          return (
            <Route
              key={index}
              exact={route.exact}
              path={route.path}
              render={(routeProps: RouteChildrenProps<any>) => (
                <route.component {...routeProps} />
              )}
            />
          );
        })}
      </Switch>
    </UserContextProvider>
  );
};

export default Application;

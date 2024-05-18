import React, { useContext } from "react";
import UserContext from "../../contexts/user";
import logging from "../../config/logging";
import { Redirect } from "react-router-dom";

export interface IAuthRouteProps {
  children?: any;
}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
  const { children } = props;

  const { user } = useContext(UserContext).userState;

  if (user._id === "") {
    logging.info("Não Autorizado, Redirecionando....");
    return <Redirect to={"/login"} />;
  } else {
    return <>{children}</>;
  }
};

export default AuthRoute;

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarText,
} from "reactstrap";
import UserContext, { initialUserState } from "../../contexts/user";

export interface INavigationProps {}

const Navigation: React.FunctionComponent<INavigationProps> = (props) => {
  const userContext = useContext(UserContext);
  const { user } = userContext.userState;

  const Logout = () => {
    userContext.userDispatch({ type: "logout", payload: initialUserState });
  };
  return (
    <Navbar color="light" light sticky="top" expand="md">
      <Container>
        <NavbarBrand tag={Link} to="/">
          📝
        </NavbarBrand>
        <Nav className="mr-auto" navbar></Nav>
        {user._id === "" ? (
          <div>
            <NavbarText tag={Link} to="/login">
              login
            </NavbarText>
            <NavbarText className="mr-2 ml-2">|</NavbarText>
            <NavbarText tag={Link} to="/register">
              Sing up
            </NavbarText>
          </div>
        ) : (
          <div>
            <Button outline tag={Link} to="/edit">
              Post a Blog
            </Button>
            <NavbarText className="mr-2 ml-2">|</NavbarText>
            <Button outline size="sm" onClick={() => Logout()}>
              Logout
            </Button>
          </div>
        )}
      </Container>
    </Navbar>
  );
};

export default Navigation;

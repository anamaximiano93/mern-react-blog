import React from "react";
import { Col, Container, Row } from "reactstrap";

export interface IHeaderProps {
  height?: string;
  image?: string;
  title: string;
  headline: string;
  children?: any;
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const { children, height, image, headline, title } = props;

  const headerStyle = {
    background:
      "linear-gradient(rgba(36,20,38,0.5),rgba(36,39,38,0.5)), url(" +
      image +
      ") no-repeat center center",
    WebkitBackgroundSize: "cover",
    MozBackgroundSize: "cover",
    OBackgroundSize: "cover",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100%",
    height: height,
  };

  return (
    <header style={headerStyle}>
      <Container>
        <Row className="align-items-center text-center">
          <Col>
            <h1 className="display-4 text-white mt-5 mb-2">{title}</h1>
            <h3 className="mb-5 text-white">{headline}</h3>
            {children}
          </Col>
        </Row>
      </Container>
    </header>
  );
};

Header.defaultProps = {
  height: "100%",
  image:
    "https://images.unsplash.com/photo-1499257398700-43669759a540?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Ym9va3x8fHx8fDE3MTIxMDgyMTg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
};

export default Header;

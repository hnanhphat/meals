import React from "react";
import i18n from "../i18n";
import { withNamespaces } from "react-i18next";
import { Navbar, Nav, Container } from "react-bootstrap";

const Header = ({ t }) => {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Meals</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link onClick={() => changeLanguage("en")}>
              {t("English")}
            </Nav.Link>
            <Nav.Link onClick={() => changeLanguage("vn")}>
              {t("Vietnamese")}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default withNamespaces()(Header);

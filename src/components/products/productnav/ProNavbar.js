import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withRouter } from "react-router";

const Header = props => {
  return (
    <Navbar bg="light" variant="light">
      <Nav>
        <Nav.Link href="/home">Home</Nav.Link>
        <Nav.Link href="/products/filters">One</Nav.Link>
        <Nav.Link href="/products/substrates">Two</Nav.Link>
      </Nav>
    </Navbar>
  );
};
export default Header; 
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';

import Auth from '../utils/auth';


const AppNavbar = () => {


  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="navbar-nav ms-auto">
          <li className="mx-1">
            <Link to="/addStory">My Story</Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navbar-nav ms-auto">
          <li className="mx-1">
            <Link to="/signup">Signup</Link>
          </li>
          <li className="mx-1">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      );
    }
  }

  
    return (

      <>
      <Navbar bg="dark" variant="dark">
          <Container>
              <Navbar.Brand href="/">Give Hope Now</Navbar.Brand>
              <Nav className="navbar-nav ms-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/about">About</Nav.Link>
                  <Nav.Link href="/stories">Stories</Nav.Link>
                  <Nav.Link href="/contact">Contact Us</Nav.Link>
                  <Nav.Link>{showNavigation()}</Nav.Link>
              </Nav>
          </Container>
      </Navbar>
      <br />
      </>
  )

};

export default AppNavbar
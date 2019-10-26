import React from "react";
import { Link } from "react-router-dom";
import auth from 'auth/api-helper.js';
// reactstrap components
import {
  Collapse,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container
} from "reactstrap";

// core components

function Menu() {
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  return (
    <>
      <div className="section section-navbars">
        <div id="navbar">
            <Navbar className="bg-info" expand="lg">
              <Container>
                <div className="navbar-translate">
                  <NavLink 
                    className="active"
                    to="/" 
                    tag={Link}
                  >
                    RAVYN
                  </NavLink>
                  <button
                    onClick={() => {
                      document.documentElement.classList.toggle("nav-open");
                      setCollapseOpen(!collapseOpen);
                    }}
                    aria-expanded={collapseOpen}
                    className="navbar-toggler"
                    type="button"
                  >
                    <span className="navbar-toggler-bar bar1"></span>
                    <span className="navbar-toggler-bar bar2"></span>
                    <span className="navbar-toggler-bar bar3"></span>
                  </button>
                </div>
                <Collapse isOpen={collapseOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem >
                      <NavLink
                       exact to="/users"
                        tag={Link}
                      >
                        <p>Users</p>
                      </NavLink>
                    </NavItem>

                    {!auth.isAuthenticated() && (
                      
                      <NavItem>
                        <NavLink 
                         exact to="/signup"
                          tag={Link}
                        >
                          <p>Register</p>
                      </NavLink>
                      </NavItem>
                      )}

                      {!auth.isAuthenticated() && (
                      <NavItem>
                      <NavLink 
                        exact to="/signin"
                        tag={Link}
                      >
                        <p>Login</p>
                      </NavLink>
                    </NavItem>
                  )}  
                      {auth.isAuthenticated() && (
                        <NavItem>
                          <NavLink 
                           exact to={"/user/" + auth.isAuthenticated().user._id}
                            tag={Link}
                          >
                            <p>Profile</p>
                          </NavLink>
                        </NavItem>
                        )}
                  </Nav>
                </Collapse>
              </Container>
            </Navbar>
        </div>
      </div>
    </>
  );
}

export default Menu;

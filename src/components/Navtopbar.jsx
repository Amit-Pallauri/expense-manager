import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";

const Navtopbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((storeState) => storeState.userState.token);
  const [token] = useState(localStorage.getItem("token") || null);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser(history));
  };

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="main">
      <Navbar className="navbar-custom" color="light" light expand="md">
        <Link to="/">
          <NavbarBrand>X-pense</NavbarBrand>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {!user && !token ? (
              <NavItem>
                <Link style={{ textDecoration: "none" }} to="/signUp">
                  <NavLink>SignUp</NavLink>
                </Link>
              </NavItem>
            ) : (
              <>
                <NavItem>
                  <Link style={{ textDecoration: "none" }} to="/dashboard">
                    <NavLink>Dashboard</NavLink>
                  </Link>
                </NavItem>

                <NavItem>
                  <NavLink onClick={handleLogout}>SignOut</NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navtopbar;

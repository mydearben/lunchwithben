import React from "react";
import { Nav, NavLink, NavIcon, Bars } from "./NavbarElements";

const Navbar = ({ toggle, heading }) => {
  return (
    <>
      <Nav>
        <NavLink to="/">{heading}</NavLink>
        <NavIcon onClick={toggle}>
          <Bars />
        </NavIcon>
      </Nav>
    </>
  );
};

export default Navbar;

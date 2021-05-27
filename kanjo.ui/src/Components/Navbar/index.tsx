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
import Auth from '../Auth';
import { User } from '../../Helpers/Types/UserTypes';

type NavProps = {
  user: User | null;
};

const Navigation = ({ user }: NavProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand className="navbar-logo" href="/">kanjo</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/entry">entry</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/emotions">
                emotion
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/examine">
                examine
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        <Auth user={user}/>
      </Navbar>
    </div>
  );
};

export default Navigation;

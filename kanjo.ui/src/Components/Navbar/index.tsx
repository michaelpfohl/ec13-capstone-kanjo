import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from 'react-router-dom';
import Auth from "../Auth";
import { User } from "../../Helpers/Types/UserTypes";

type NavProps = {
  user: User | null;
};

const Navigation = ({ user }: NavProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <div className="navbar-overlay">
        <Navbar expand="md">
          <Link className="navbar-logo" to="/">
            kanjo
          </Link>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/entry"><i className="fas fa-pen-alt circle-icon"></i></NavLink>
              </NavItem>
              {user && (
                <NavItem>
                  <NavLink href="/all-entries"><i className="fas fa-book circle-icon"></i></NavLink>
                </NavItem>
              )}
              <NavItem>
                <NavLink href="/emotions"><i className="fas fa-smile circle-icon"></i></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/examine"><i className="fas fa-search circle-icon"></i></NavLink>
              </NavItem>
            </Nav>
          </Collapse>
          <Auth user={user} />
        </Navbar>
      </div>
    </div>
  );
};

export default Navigation;

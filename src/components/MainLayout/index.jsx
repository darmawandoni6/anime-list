import React from 'react';

import Link from 'next/link';

import { Collapse, Container, Nav, NavItem, NavLink, Navbar, NavbarToggler } from 'reactstrap';

import styles from './styles.module.scss';

const MainLayout = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      <Navbar container="lg" expand="lg" className={styles.navbar}>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <Link href="/" className="nav-link">
                Home
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/list" className="nav-link">
                List Anime
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/bookmark" className="nav-link">
                Bookmark
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Container>{children}</Container>
      <div className={styles.footer}>
        <div className="txt">
          <span>Copyright © 2023 oploverz.asia. All Rights Reserved</span>
          <p>
            Disclaimer: This site <i>oploverz.asia</i> does not store any files on its server. All
            contents are provided by non-affiliated third parties.
          </p>
        </div>
      </div>
    </>
  );
};

export default MainLayout;

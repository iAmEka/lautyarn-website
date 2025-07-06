// src/components/Navbar.jsx
import React from 'react';
import {
  Navbar as RBNavbar,
  Nav,
  Container,
  Dropdown
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import '../styles/ghibli-navbar.css';

const Navbar = ({ user, userRole, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
      navigate('/');
      alert('Berhasil logout!');
    } catch (error) {
      alert('Gagal logout: ' + error.message);
    }
  };

  return (
    <RBNavbar expand="lg" className="ghibli-navbar fixed-top">
      <Container fluid className="px-4">
        {/* Brand */}
        <RBNavbar.Brand as={Link} to="/" className="ghibli-brand">
          Lautyarn
        </RBNavbar.Brand>

        {/* Hamburger Toggle */}
        <RBNavbar.Toggle
          aria-controls="navbar-nav"
          className="ghibli-menu-toggle border-0 bg-transparent shadow-none p-0"
        >
          <span className="ghibli-menu-icon small-icon">☰</span>
        </RBNavbar.Toggle>

        {/* Nav Contents */}
        <RBNavbar.Collapse id="navbar-nav" className="justify-content-center">
          <Nav className="mx-auto ghibli-nav-center">
            {userRole !== 'admin' && (
              <Nav.Link as={Link} to="/store" className="nav-link-ghibli">
                Store
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/about" className="nav-link-ghibli">
              About
            </Nav.Link>

            {user && userRole === 'customer' && (
              <Nav.Link as={Link} to="/favorite" className="nav-link-ghibli">
                Favorite
              </Nav.Link>
            )}

            {user && userRole === 'admin' && (
              <>
                <Nav.Link as={Link} to="/admin-dashboard" className="nav-link-ghibli">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/history" className="nav-link-ghibli">
                  History
                </Nav.Link>
              </>
            )}
          </Nav>

          {/* Right Side Dropdown */}
          <Nav className="ms-auto">
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="light"
                className="ghibli-menu-toggle border-0 bg-transparent shadow-none p-0"
              >
                <span className="ghibli-menu-icon small-icon">☰</span>
              </Dropdown.Toggle>

              <Dropdown.Menu className="ghibli-dropdown-menu shadow">
                {user ? (
                  <>
                    {userRole === 'customer' && (
                      <Dropdown.Item as={Link} to="/mydashboard">My Dashboard</Dropdown.Item>
                    )}
                    <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </>
                ) : (
                  <>
                    <Dropdown.Item as={Link} to="/login">Login</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/register">Register</Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </RBNavbar.Collapse>
      </Container>
    </RBNavbar>
  );
};

export default Navbar;

import React, { useState } from 'react';
import {
  Navbar as RBNavbar,
  Nav,
  Container,
  Image,
  Offcanvas,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

const CustomToggle = React.forwardRef(({ onClick }, ref) => (
  <span
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className="d-lg-none"
    style={{ cursor: 'pointer' }}
  >
    <Image src="/menu.png" alt="menu" width={28} height={28} />
  </span>
));

const Navbar = ({ user, userRole, onLogout }) => {
  const navigate = useNavigate();
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  const handleGuestAccess = (path) => {
    alert("Silakan login terlebih dahulu!");
    handleClose(); // auto close
    navigate("/login", { state: { redirectTo: path } });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
      navigate('/');
      alert('Berhasil logout!');
      handleClose();
    } catch (error) {
      alert('Gagal logout: ' + error.message);
    }
  };

  const handleNavClick = (path) => {
    handleClose();
    navigate(path);
  };

  return (
    <>
      <style>{`
        @font-face {
          font-family: 'Marykate';
          src: url('/fonts/MaryKate.ttf') format('truetype');
        }

        .marykate-font {
          font-family: 'Marykate', cursive;
          font-size: 1.5rem;
          font-weight: bold;
          color: #000;
        }

        .navbar-minimal {
          padding-top: 0 !important;
          padding-bottom: 0 !important;
          height: 56px;
        }

        .navbar-brand,
        .nav-link {
          padding-top: 0.3rem;
          padding-bottom: 0.3rem;
        }

        .nav-link {
          cursor: pointer;
        }

        .nav-link:hover {
          color: #c45b56; 
        }

      `}</style>

      <RBNavbar
        expand="lg"
        fixed="top"
        className="shadow-sm navbar-minimal"
        style={{ backgroundColor: '#f1d1cc' }}
      >
        <Container fluid className="px-3">
          <RBNavbar.Brand as={Link} to="/" className="d-flex align-items-center gap-3 fw-bold px-2">
            <Image src="/logo.png" alt="logo" roundedCircle width={30} height={30} />
            <span className="marykate-font" style={{ letterSpacing: '6px' }}>Lautyarn</span>
          </RBNavbar.Brand>

          <RBNavbar.Toggle as={CustomToggle} onClick={handleShow} aria-controls="offcanvasNavbar-expand-lg" />

          <RBNavbar.Collapse id="offcanvasNavbar-expand-lg" className="d-none d-lg-flex">
            <Nav className="ms-auto d-flex align-items-center gap-5 fw-semibold">
              <Nav.Link onClick={() => user ? navigate("/store") : handleGuestAccess("/store")}>Shop</Nav.Link>

              {user && userRole === 'admin' && (
                <>
                  <Nav.Link as={Link} to="/admin-dashboard">Dashboard</Nav.Link>
                  <Nav.Link as={Link} to="/history">History</Nav.Link>
                  <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                </>
              )}

              {user && userRole === 'customer' && (
                <>
                  <Nav.Link as={Link} to="/#about">About</Nav.Link>
                  <Nav.Link as={Link} to="/#contact">Contact</Nav.Link>
                  <Nav.Link as={Link} to="/mydashboard">Dashboard</Nav.Link>
                  <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                </>
              )}

              {!user && (
                <>
                  <Nav.Link as={Link} to="/#about">About</Nav.Link>
                  <Nav.Link as={Link} to="/#contact">Contact</Nav.Link>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register">Register</Nav.Link>
                </>
              )}
            </Nav>
          </RBNavbar.Collapse>

          <RBNavbar.Offcanvas
            show={showOffcanvas}
            onHide={handleClose}
            id="offcanvasNavbar-expand-lg"
            aria-labelledby="offcanvasNavbarLabel-expand-lg"
            placement="end"
            className="d-lg-none"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="d-flex flex-column gap-1">
                <Nav.Link onClick={() => user ? handleNavClick("/store") : handleGuestAccess("/store")}>Shop</Nav.Link>

                {user && userRole === 'admin' && (
                  <>
                    <Nav.Link onClick={() => handleNavClick("/admin-dashboard")}>Dashboard</Nav.Link>
                    <Nav.Link onClick={() => handleNavClick("/history")}>History</Nav.Link>
                    <Nav.Link onClick={() => handleNavClick("/profile")}>Profile</Nav.Link>
                  </>
                )}

                {user && userRole === 'customer' && (
                  <>
                    <Nav.Link onClick={() => handleNavClick("/#about")}>About</Nav.Link>
                    <Nav.Link onClick={() => handleNavClick("/#contact")}>Contact</Nav.Link>
                    <Nav.Link onClick={() => handleNavClick("/mydashboard")}>Dashboard</Nav.Link>
                    <Nav.Link onClick={() => handleNavClick("/profile")}>Profile</Nav.Link>
                  </>
                )}

                {!user && (
                  <>
                    <Nav.Link onClick={() => handleNavClick("/#about")}>About</Nav.Link>
                    <Nav.Link onClick={() => handleNavClick("/#contact")}>Contact</Nav.Link>
                    <Nav.Link onClick={() => handleNavClick("/login")}>Login</Nav.Link>
                    <Nav.Link onClick={() => handleNavClick("/register")}>Register</Nav.Link>
                  </>
                )}
              </Nav>
            </Offcanvas.Body>
          </RBNavbar.Offcanvas>
        </Container>
      </RBNavbar>
    </>
  );
};

export default Navbar;

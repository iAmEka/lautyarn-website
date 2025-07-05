// lautyarn-website/src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const Home = ({ user, userRole }) => {
  return (
    <Container className="text-center py-5">
      <h1 className="display-4 fw-bold mb-4">Selamat Datang di Lautyarn!</h1>
      {user ? (
        <p className="lead">Anda sudah login sebagai <strong className="text-primary">{user.email}</strong> dengan peran <strong className="text-info">{userRole}</strong>.</p>
      ) : (
        <p className="lead">Silakan <Link to="/login" className="text-primary">login</Link> atau <Link to="/register" className="text-success">daftar</Link> untuk melanjutkan.</p>
      )}
      <p className="text-muted mt-3">Jelajahi koleksi rajutan unik kami!</p>
    </Container>
  );
};
export default Home;
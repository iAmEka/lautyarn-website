// components/GhibliLoader.jsx
import React from 'react';
import { Spinner } from 'react-bootstrap';

const GhibliLoader = () => {
  const containerStyle = {
    backgroundImage: `url('/ghibli-bg.jpg')`, // Pastikan gambar tersedia di public/
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    textShadow: '1px 1px 3px rgba(0,0,0,0.8)',
  };

  return (
    <div style={containerStyle}>
      <Spinner animation="border" variant="light" style={{ width: '3rem', height: '3rem' }} />
      <p className="mt-3 fs-5" style={{ fontFamily: "'Cinzel Decorative', cursive" }}>
        Memuat keajaiban rajutan...
      </p>
    </div>
  );
};

export default GhibliLoader;

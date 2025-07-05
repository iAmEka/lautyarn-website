// lautyarn-website/src/pages/About.jsx
import React from 'react';
import { Container } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="py-5 text-center">
      <h1 className="mb-4">Tentang Lautyarn</h1>
      <p className="lead">Kami adalah toko rajutan yang bersemangat menciptakan produk unik dan berkualitas tinggi.</p>
      <p className="text-muted mt-3">Dibuat dengan cinta dan dedikasi untuk Anda.</p>
    </Container>
  );
};
export default About;
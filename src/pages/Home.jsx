import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Button, Row, Col, Card, Image } from 'react-bootstrap';

const placeholderImg = "https://via.placeholder.com/200";

const Home = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // inisialisasi saat mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  }, [location]);

  const sections = [
    { title: '🧵 Our New Release', color: 'success', data: [1, 2, 3, 4, 5] },
    { title: '🔥 Most Popular', color: 'danger', data: [1, 2, 3] }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="container-fluid py-5" style={{ backgroundColor: '#fff4e8', height: '100vh' }}>
        <div className="row flex-column flex-md-row align-items-center h-100 px-3 px-md-5 ">
          
          {/* Mobile-Only Wrapper */}
          <div className="col-12 d-md-none d-flex flex-column justify-content-center align-items-center h-100 text-center gap-3">

            {/* Branding */}
            <div>
              <p className="fw-bold mb-1" style={{ fontSize: '1.2rem' }}>Handcrafts ➰</p>
              <h1 style={{
                fontFamily: 'MaryKate',
                color: '#a45d83',
                fontSize: 'clamp(2.5rem, 10vw, 3.5rem)',
                letterSpacing: '3px',
                margin: 0
              }}>
                Lautyarn
              </h1>
              <div className="d-flex justify-content-center align-items-center gap-2">
                <h1 style={{
                  fontFamily: 'MaryKate',
                  color: '#bb3e81',
                  fontSize: 'clamp(2.5rem, 10vw, 3.5rem)',
                  letterSpacing: '3px',
                  margin: 0
                }}>
                  Corner
                </h1>
                <Image src="/octopus.png" alt="logo" style={{ height: '3rem', width: 'auto' }} />
              </div>
            </div>

            {/* CTA Button */}
            <div className="w-75">
              <Button
                as={Link}
                to="/store"
                className="w-100"
                style={{
                  backgroundColor: '#ffcde8',
                  borderColor: '#ffcde8',
                  borderRadius: '100px',
                  color: '#000',
                  padding: '0.675rem 1.5rem',
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              >
                Mulai Belanja
              </Button>
            </div>

            {/* Quote */}
            <div className="mt-3 px-3">
              <p className="fw-bold" style={{
                fontFamily: 'Quicksand',
                fontSize: '1.25rem',
                color: '#ac7b7b',
                marginBottom: '0.5rem'
              }}>
                Crafted with care, just for you
              </p>
              <p style={{
                fontFamily: 'Quicksand',
                fontSize: '0.95rem',
                color: '#444',
                lineHeight: 1.5
              }}>
                All pieces are handmade with love, one loop at a time. Feel the warmth, the care, and the joy woven into each creation.
              </p>
            </div>
          </div>

          {/* Desktop Original (Unchanged) */}
          <div className="col-md-6 d-none d-md-flex justify-content-md-start">
            <div className='ms-5' style={{ maxWidth: '500px' }}>
              <p className="fw-bold" style={{ fontSize: '1.65rem', marginBottom: '-2.5rem' }}>
                Handcrafts ➰
              </p>
              <p className="fw-bold" style={{ fontFamily: 'MaryKate', color: '#a45d83', fontSize: '8.41rem', letterSpacing: '5px', marginBottom: '-5rem' }}>
                Lautyarn
              </p>
              <div className="d-flex align-items-center gap-2" style={{ marginBottom: '-3.5rem' }}>
                <p className="fw-bold m-0" style={{ fontFamily: 'MaryKate', color: '#bb3e81', fontSize: '8.41rem', letterSpacing: '5px' }}>
                  Corner
                </p>
                <Image src="/octopus.png" alt="logo" style={{ height: '6rem', width: 'auto' }} />
              </div>
              <div className="mt-3">
                <Button
                  as={Link}
                  to="/store"
                  style={{
                    backgroundColor: '#ffcde8',
                    borderColor: '#ffcde8',
                    borderRadius: '100px',
                    color: '#000',
                    padding: '0.675rem 2rem',
                    fontWeight: 600,
                    fontSize: '1.1rem'
                  }}
                >
                  Mulai Belanja
                </Button>
              </div>
            </div>
          </div>

          <div className="col-md-6 d-none d-md-flex text-end align-items-center">
            <div>
              <p className="fw-bold m-0" style={{ fontFamily: 'Quicksand', fontSize: '3.68rem', color: '#ac7b7b' }}>
                Crafted with care,
              </p>
              <div className="d-flex justify-content-end align-items-center gap-2 mt-2 mb-3">
                <Image src="/yarn.png" alt="logo" style={{ height: '2.5rem', width: 'auto' }} />
                <p className="fw-bold m-0" style={{ fontFamily: 'Quicksand', fontSize: '3.68rem', color: '#ac7b7b' }}>
                  just for you
                </p>
              </div>
              <p
                className="fw-bold"
                style={{
                  fontFamily: 'Quicksand',
                  fontSize: '1.25rem',
                  textAlign: 'end',
                }}
              >
                All pieces are handmade with love, one loop at a time. Feel the warmth, the care, and the joy woven into each creation. Made by me, just for you.
              </p>
            </div>
          </div>
        </div>
      </div>


      {/* Produk Section */}
      <Container fluid className="py-5 px-4">
        <Row className="gy-5">
          {sections.map((sec, idx) => (
            <Col key={idx} md={6}>
              <h5 className={`fw-bold mb-3 text-${sec.color} text-center`} style={{ fontFamily: "'Cinzel Decorative'" }}>
                {sec.title}
              </h5>
              <Row className="g-3 justify-content-center">
                {sec.data.map(i => (
                  <Col key={i} xs={6} sm={4} md={3} lg={2}>
                    <Card className="text-center border-0 bg-transparent">
                      <Card.Img src={placeholderImg} className="img-fluid rounded" />
                      <Card.Body className="p-2">
                        <div className={`fw-semibold text-${sec.color} small`}>
                          {(sec.title.includes('New') ? 'New Item' : 'Best Seller')} #{i}
                        </div>
                        <Button variant={`outline-${sec.color}`} size="sm" as={Link} to="/store" className="mt-1 w-100">
                          Detail
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          ))}
        </Row>
      </Container>

      {/* About Section */}
      <Container id="about" fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-light px-3">
        <Row className="w-100 justify-content-center">
          <Col md={10} lg={8}>
            <Card className="border-0 shadow p-4 bg-white text-center">
              <Card.Body>
                <h3 className="fw-bold mb-4" style={{ fontFamily: "'Cinzel Decorative'", color: '#6b4c3b' }}>
                  🌿 Tentang Kami
                </h3>
                <p className="text-muted" style={{ fontSize: isMobile ? '0.95rem' : '1rem' }}>
                  Kami adalah tim kecil yang percaya bahwa setiap rajutan membawa cerita dan kehangatan. <br />
                  Dengan bahan terbaik dan penuh cinta, kami menciptakan produk handmade yang tidak hanya indah, tapi juga bermakna. <br />
                  Terinspirasi dari keindahan alam dan dunia Studio Ghibli, setiap karya kami punya sentuhan magis tersendiri ✨🧶
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;

import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Button, Row, Col, Card, Image } from 'react-bootstrap';
import '../styles/home-mobile.css'; // Import styling khusus mobile

const placeholderImg = "https://via.placeholder.com/200";

const Home = () => {
  const location = useLocation();

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
      <div className="d-flex w-100 vh-100 m-0 p-0 hero-section" style={{ backgroundColor: '#fff4e8' }}>
        {/* Left Side */}
        <div className="d-flex ps-5 pt-5 mt-5 hero-section-left" style={{ width: '50%' }}>
          <div className="px-4" style={{ maxWidth: '500px' }}>
            <p className="fw-bold brand-tagline" style={{ fontSize: '1.65rem', marginBottom: '-50px' }}>Handcrafts ➰</p>
            <p className="fw-bold brand-title" style={{ fontFamily: 'MaryKate', fontSize: '8.4rem', letterSpacing: '10px', marginBottom: '-120px' }}>
              Lautyarn
            </p>
            <div className="d-flex align-items-center gap-2 title-group">
              <p className="fw-bold m-0 brand-title" style={{ fontFamily: 'MaryKate', fontSize: '8.4rem', letterSpacing: '10px' }}>
                Corner
              </p>
              <Image src="/octopus.png" alt="logo" className="logo-octopus" style={{ height: '8.4rem', width: 'auto' }} />
            </div>
            <Button
              as={Link}
              to="/store"
              className="btn-shop ms-5"
              style={{backgroundColor: '#ffcde8',
                borderColor: '#ffcde8',
                borderRadius: '100px',
                color: '#000',
                padding: '0.675rem 2rem',
                fontWeight: 600,
                fontSize: '1.28rem',
                marginTop: '-60px'
              }}
            >
              Mulai Belanja
            </Button>
          </div>
        </div>

        {/* Right Side */}
        <div className="d-flex flex-column align-items-end text-end pe-5 pt-5 mt-5" style={{ width: '50%' }}>
          <p className="fw-bold m-0 brand-subtitle" style={{ fontFamily: 'Quicksand', fontSize: '3.68rem', color: '#ac7b7b' }}>
            Crafted with care,
          </p>
          <div className="d-flex align-items-center gap-2" style={{ marginTop: '-20px', marginBottom: '20px' }}>
            <Image src="/yarn.png" alt="logo" style={{ height: '3.68rem', width: 'auto' }} />
            <p className="fw-bold m-0 brand-subtitle" style={{ fontFamily: 'Quicksand', fontSize: '3.68rem', color: '#ac7b7b' }}>
              just for you
            </p>
          </div>
          <p className="fw-bold m-0 brand-description" style={{ fontFamily: 'Quicksand', fontSize: '1.57rem', textAlign: 'justify' }}>
            All pieces are handmade with love, one loop at a time. Feel the warmth, the care, and the joy woven into each creation. Made by me, just for you.
          </p>
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
                  <Col key={i} xs={4} sm={3} md={3} lg={2}>
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
      <Container id="about" fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <Row className="w-100 justify-content-center">
          <Col md={10} lg={8}>
            <Card className="border-0 shadow p-4 bg-white text-center">
              <Card.Body>
                <h3 className="fw-bold mb-4" style={{ fontFamily: "'Cinzel Decorative'", color: '#6b4c3b' }}>
                  🌿 Tentang Kami
                </h3>
                <p className="text-muted">
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

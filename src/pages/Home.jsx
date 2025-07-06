import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';

const placeholderImg = "https://via.placeholder.com/200";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      // Delay scroll supaya elemen sempat dirender dulu
      const scrollToHash = () => {
        const el = document.querySelector(location.hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      };

      // Coba scroll langsung (kalau sudah ready), atau tunggu 200ms
      setTimeout(scrollToHash, 200);
    }
  }, [location]);
  return (
    <div style={{ fontFamily: "'Quicksand', sans-serif", backgroundColor: '#fdfcf6' }}>
      {/* Hero Section */}
      <div id="hero" className="d-flex align-items-center text-white" style={{

        backgroundImage: "url('https://images.unsplash.com/photo-1602810312537-3cc3fa2a4c49?auto=format&fit=crop&w=1470&q=80')",
        backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', position: 'relative'
      }}>
        <div className="container" style={{ zIndex: 2, maxWidth: '600px' }}>
          <h1 className="fw-bold mb-3" style={{
            fontFamily: "'Cinzel Decorative', cursive", fontSize: '2rem', textShadow: '2px 2px 6px rgba(0,0,0,0.6)'
          }}>
            Rajutan itu cinta, benangnya adalah takdir.
          </h1>
          <p className="mb-4" style={{ fontSize: '0.9rem', textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
            Temukan kehangatan dalam setiap jahitan. Hidup terlalu singkat untuk tidak memakai rajutan lucu 🧶✨
          </p>
          <Button as={Link} to="/store" variant="light" size="sm" className="fw-semibold">🌸 Mulai Belanja</Button>
        </div>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0,0,0,0.35)' }} />
      </div>

      {/* Produk Section */}
      <Container fluid className="py-5 px-4">
        <Row className="gy-4">
          {[
            { title: '🧵 Our New Release', color: 'success', data: [1, 2, 3, 4, 5] },
            { title: '🔥 Most Popular', color: 'danger', data: [1, 2, 3] }
          ].map((section, idx) => (
            <Col key={idx} md={6} className="d-flex flex-column align-items-center">
              <h5 className={`fw-bold mb-3 text-${section.color} text-center`} style={{ fontFamily: "'Cinzel Decorative', cursive" }}>
                {section.title}
              </h5>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                {section.data.map(i => (
                  <Card key={i} className="product-card text-center border-0 bg-transparent">
                    <Card.Img variant="top" src={placeholderImg} className="product-img" />
                    <Card.Body className="px-1 py-2">
                      <div className={`text-truncate fw-semibold text-${section.color}`}>
                        {section.title.includes("New") ? "New Item" : "Best Seller"} #{i}
                      </div>
                      <Button variant={`outline-${section.color}`} size="sm" as={Link} to="/store" className="mt-1 product-btn">Detail</Button>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* About Us Section */}
      <Container id="about" fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#f5f0e6' }}>

        <Row className="w-100 justify-content-center">
          <Col md={10} lg={8}>
            <Card className="border-0 shadow-lg p-4 about-card">
              <Card.Body className="text-center">
                <h3 className="fw-bold mb-4" style={{ fontFamily: "'Cinzel Decorative', cursive", color: '#6b4c3b' }}>
                  🌿 Tentang Kami
                </h3>
                <p className="about-text">
                  Kami adalah tim kecil yang percaya bahwa setiap rajutan membawa cerita dan kehangatan. <br />
                  Dengan bahan terbaik dan penuh cinta, kami menciptakan produk handmade yang tidak hanya indah, tapi juga bermakna. <br />
                  Terinspirasi dari keindahan alam dan dunia Studio Ghibli, setiap karya kami punya sentuhan magis tersendiri ✨🧶
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Mobile Styles */}
      <style>{`
        @media (max-width: 576px) {
          .product-card {
            width: 80px !important;
            font-size: 0.6rem !important;
          }
          .product-img {
            height: 70px !important;
            border-radius: 8px;
            object-fit: cover;
          }
          .product-btn {
            font-size: 0.6rem !important;
          }
          .about-card {
            border-radius: 15px !important;
            padding: 1.5rem !important;
            background-color: rgba(255,255,255,0.85);
          }
          .about-text {
            font-size: 0.85rem !important;
            line-height: 1.6 !important;
            color: #4b3e34;
          }
        }

        @media (min-width: 577px) {
          .product-card {
            width: 110px;
            font-size: 0.75rem;
          }
          .product-img {
            height: 100px;
            border-radius: 10px;
            object-fit: cover;
          }
          .product-btn {
            font-size: 0.7rem;
          }
          .about-text {
            font-size: 1rem;
            line-height: 1.8;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;

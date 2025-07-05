// src/pages/Store.jsx
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Container, Button } from 'react-bootstrap';
import '../styles/Store.css';

const API_BASE_URL = 'https://lautyarn-api-nixpacksstartcmd.up.railway.app';

const Store = ({ user }) => {
  const [rajutan, setRajutan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRajutan = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/rajutan/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRajutan(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRajutan();
  }, []);

  const isGuest = !user;

  if (loading) return <p className="text-center my-5">Memuat produk...</p>;
  if (error) return <p className="text-center my-5 text-danger">Error memuat produk: {error}</p>;

  return (
    <div className="ghibli-background-store">
      <Container className="py-5">
        <h1 className="mb-4 text-center ghibli-title">🧶 Toko Rajutan Ghibli 🧶</h1>
        <p className="lead text-center ghibli-subtitle mb-5">Temukan kehangatan dalam setiap rajutan.</p>
        <Row xs={1} md={2} lg={4} className="g-4">
          {rajutan.length > 0 ? (
            rajutan.map((item) => (
              <Col key={item.id}>
                <Card className="h-100 ghibli-card">
                  {item.url_gambar && (
                    <Card.Img
                      variant="top"
                      src={item.url_gambar}
                      className="card-img-top-custom"
                    />
                  )}
                  <Card.Body className="text-center d-flex flex-column">
                    <Card.Title className="fw-bold fs-5 mb-2 ghibli-card-title">{item.nama}</Card.Title>
                    <Card.Text className="text-primary fs-4 fw-bold">
                      Rp{item.price.toLocaleString('id-ID')}
                    </Card.Text>
                    <Card.Text className="text-muted small mb-2">
                      <span>❤️ {item.count_like}</span> &nbsp;
                      <span>⭐ {item.count_favorite}</span>
                    </Card.Text>
                    <Card.Text className="text-secondary small">
                      Warna: {item.colorcode.join(', ')}
                    </Card.Text>
                    <Button
                      disabled={isGuest}
                      onClick={() =>
                        isGuest
                          ? alert('Silakan login untuk melakukan pembelian.')
                          : alert(`Beli produk: ${item.nama}`)
                      }
                      className="mt-auto ghibli-buy-button"
                      variant="success"
                    >
                      Beli Sekarang
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <p className="text-center text-muted">Belum ada produk rajutan.</p>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Store;
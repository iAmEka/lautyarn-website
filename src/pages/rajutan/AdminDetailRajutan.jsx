import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Badge,
  Spinner,
  Button,
} from 'react-bootstrap';
import { BsArrowLeft, BsPencil } from 'react-icons/bs';

const API_BASE_URL = 'https://lautyarn-api-nixpacksstartcmd.up.railway.app';

const AdminDetailRajutan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rajutan, setRajutan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/rajutan/${id}`);
        const data = await res.json();
        setRajutan(data);
      } catch (err) {
        console.error('Error loading detail:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="secondary" />
      </div>
    );
  }

  if (!rajutan) return <p className="text-center mt-5">Data tidak ditemukan.</p>;

  const {
    nama,
    count_like,
    count_favorite,
    price,
    url_gambar,
    status,
    deskripsi,
    created_at,
    type_rajutan,
    colorcode,
  } = rajutan;

  return (
    <Container className="py-4">
      <Button variant="link" className="text-decoration-none mb-4 text-muted" onClick={() => navigate(-1)}>
        <BsArrowLeft className="me-1" /> Kembali
      </Button>

      <Row className="gx-5">
        {/* KIRI: Gambar & Info Ringkas */}
        <Col xs={12} md={5} className="mb-4 mb-md-0">
          <div
            className="mb-3"
            style={{
              border: '1px solid #ccc',
              borderRadius: '1rem',
              overflow: 'hidden',
            }}
          >
            <img
              src={url_gambar}
              alt={nama}
              className="img-fluid"
              style={{
                width: '100%',
                maxHeight: '500px',
                objectFit: 'cover',
              }}
            />
          </div>

          <div>
            <h4 className="fw-bold">{nama}</h4>
            <Badge
              bg={status === 'ready' ? 'success' : 'warning'}
              className="text-capitalize mb-2"
            >
              {status}
            </Badge>
            <div className="text-muted small mt-1">
              Ditambahkan pada: {new Date(created_at).toLocaleDateString('id-ID')} <br />
              Tipe: {type_rajutan?.nama || '-'}
            </div>
          </div>
        </Col>

        {/* KANAN: Detail */}
        <Col xs={12} md={7}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="text-secondary fw-bold mb-0">🧶 Detail Rajutan</h5>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => navigate(`/admin-dashboard/rajutan/edit/${id}`)}
            >
              <BsPencil className="me-1" /> Edit
            </Button>
          </div>

          <div style={{ backgroundColor: '#fffef6', borderRadius: '1rem', padding: '1.5rem' }}>
            <p><strong>Nama:</strong> {nama}</p>
            <p><strong>Deskripsi:</strong><br />{deskripsi || '-'}</p>
            <p><strong>Harga:</strong> Rp {price.toLocaleString()}</p>
            <p><strong>Like:</strong> ❤️ {count_like} &nbsp; | &nbsp; <strong>Favorite:</strong> ⭐ {count_favorite}</p>
            <p><strong>Color Code:</strong> {colorcode?.join(', ') || '-'}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDetailRajutan;

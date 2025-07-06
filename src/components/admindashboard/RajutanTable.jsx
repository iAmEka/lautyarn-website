import React from 'react';
import { Card, Image, Form, Button, Row, Col, Badge } from 'react-bootstrap';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const RajutanTable = ({ items, onEdit, onDelete, onToggleStatus }) => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column gap-3">
      {items.map((item) => (
        <Card key={item.id} className="shadow-sm border-0 rounded-3 px-3 py-3">
          <Row className="g-2 align-items-center">
            {/* Kolom 1: Gambar */}
            <Col xs={4} md={2} className="text-center">
              <Image
                src={item.url_gambar}
                rounded
                fluid
                style={{
                  height: '70px',
                  width: '70px',
                  objectFit: 'cover',
                }}
              />
            </Col>

            {/* Kolom 2: Informasi */}
            <Col xs={5} md={7}>
              <div className="fw-semibold mb-1" style={{ fontSize: '0.85rem' }}>
                {item.nama}
              </div>
              <div className="text-muted" style={{ fontSize: '0.7rem' }}>
                {item.deskripsi}
              </div>
              <div
                className="d-flex flex-wrap gap-2 mt-1"
                style={{ fontSize: '0.65rem', color: '#555' }}
              >
                <span>❤️ {item.count_like}</span>
                <span>⭐ {item.count_favorite}</span>
                <span>💰 Rp {item.price.toLocaleString()}</span>
              </div>
            </Col>

            {/* Kolom 3: Aksi */}
            <Col xs={3} md={3} className="text-end">
              <div className="d-flex flex-column gap-1 align-items-end">
                <Badge
                  bg={item.status === 'ready' ? 'success' : 'warning'}
                  className="text-capitalize"
                  style={{ fontSize: '0.65rem' }}
                >
                  {item.status}
                </Badge>

                <Form.Check
                  type="switch"
                  id={`switch-${item.id}`}
                  checked={item.status === 'ready'}
                  onChange={() => onToggleStatus(item)}
                  label=""
                  className="small"
                  style={{ transform: 'scale(0.8)' }}
                />

                <div>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-1 px-1 py-0"
                    style={{ fontSize: '0.75rem' }}
                    onClick={() => navigate(`/admin-dashboard/rajutan/edit/${item.id}`)}
                  >
                    <BsPencil />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="px-1 py-0"
                    style={{ fontSize: '0.75rem' }}
                    onClick={() => onDelete(item.id)}
                  >
                    <BsTrash />
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      ))}
    </div>
  );
};

export default RajutanTable;

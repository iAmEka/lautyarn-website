import React, { useState } from 'react';
import {
  Card,
  Image,
  Form,
  Button,
  Row,
  Col,
  Badge,
  Spinner,
  InputGroup,
} from 'react-bootstrap';
import { BsPencil, BsTrash, BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const RajutanTable = ({ items, onDelete, onToggleStatus, loadingItemId }) => {
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 576;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');

  // Ambil daftar tipe yang unik dari data
  const uniqueTypes = Array.from(
    new Set(items.map((item) => item.type_rajutan?.nama).filter(Boolean))
  );

  const filteredItems = items.filter((item) => {
    const nameMatch = item.nama.toLowerCase().includes(searchTerm.toLowerCase());
    const typeMatch = item.type_rajutan?.nama?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch = nameMatch || typeMatch;
    const matchesType = selectedType ? item.type_rajutan?.nama === selectedType : true;
    return matchesSearch && matchesType;
  });

  const sortedItems = [...filteredItems].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return (
    <>
      {/* Filter dan Pencarian */}
      <Row className="align-items-center mb-3">
        <Col xs={12} md={6}>
          <InputGroup size="sm">
            <InputGroup.Text><BsSearch /></InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Cari nama atau tipe rajutan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs={12} md={6} className="mt-2 mt-md-0">
          <Form.Select
            size="sm"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Semua Tipe</option>
            {uniqueTypes.map((type, idx) => (
              <option key={idx} value={type}>
                {type}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* Konten Scrollable */}
      <div style={{ maxHeight: '70vh', overflowY: 'auto', paddingRight: '8px' }}>
        <div className="d-flex flex-column gap-3">
          {sortedItems.map((item) => {
            const isLoading = loadingItemId === item.id;
            const typeName = item.type_rajutan?.nama || '-';

            return (
              <div key={item.id} className="position-relative">
                {isLoading && (
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.6)',
                      zIndex: 10,
                      borderRadius: '0.75rem',
                    }}
                  >
                    <Spinner animation="border" variant="secondary" />
                  </div>
                )}

                <Card className="shadow-sm border-0 rounded-3">
                  <Row className="g-0 align-items-center p-2">
                    <Col xs={4} md={2} className="text-center">
                      <Image
                        src={item.url_gambar}
                        rounded
                        fluid
                        style={{ height: 80, width: 80, objectFit: 'cover' }}
                      />
                    </Col>

                    <Col xs={5} md={7}>
                      <div className="fw-semibold" style={{ fontSize: isMobile ? '0.6rem' : '0.9rem' }}>
                        {item.nama}
                      </div>
                      <div className="text-muted" style={{ fontSize: isMobile ? '0.5rem' : '0.7rem' }}>
                        Tipe: {typeName}
                      </div>
                      <div
                        className="d-flex flex-wrap gap-2 mt-1"
                        style={{ fontSize: isMobile ? '0.5rem' : '0.7rem', color: '#555' }}
                      >
                        <span>❤️ {item.count_like}</span>
                        <span>⭐ {item.count_favorite}</span>
                        <span>💰 Rp {item.price.toLocaleString()}</span>
                      </div>
                    </Col>

                    <Col xs={3} md={3} className="text-end">
                      <div className="d-flex flex-column align-items-end gap-1">
                        <Badge
                          bg={item.status === 'ready' ? 'success' : 'warning'}
                          className="text-capitalize"
                          style={{ fontSize: isMobile ? '0.5rem' : '0.65rem' }}
                        >
                          {item.status}
                        </Badge>

                        <Form.Check
                          type="switch"
                          id={`switch-${item.id}`}
                          label=""
                          checked={item.status === 'ready'}
                          onChange={() => onToggleStatus(item)}
                          disabled={isLoading}
                          className="small"
                          style={{ transform: 'scale(0.85)' }}
                        />

                        <div className="d-flex justify-content-end gap-1">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="px-1 py-0"
                            style={{ fontSize: isMobile ? '0.55rem' : '0.75rem' }}
                            onClick={() => navigate(`/admin-dashboard/rajutan/edit/${item.id}`)}
                          >
                            <BsPencil />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="px-1 py-0"
                            style={{ fontSize: isMobile ? '0.55rem' : '0.75rem' }}
                            onClick={() => onDelete(item.id)}
                          >
                            <BsTrash />
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </div>
            );
          })}

          {sortedItems.length === 0 && (
            <div className="text-muted text-center small">Tidak ada data yang cocok.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default RajutanTable;

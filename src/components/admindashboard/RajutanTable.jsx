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

      {/* Header Desktop */}
      {!isMobile && (
        <div className="mb-2 d-none d-md-block">
          <Row className="fw-bold text-muted small">
            <Col md={2}>Gambar</Col>
            <Col md={3}>Nama & Tipe</Col>
            <Col md={3}>Harga / Like / Fav</Col>
            <Col md={2}>Status</Col>
            <Col md={2}>Aksi</Col>
          </Row>
        </div>
      )}

      <div style={{ maxHeight: '70vh', overflowY: 'auto', paddingRight: '8px' }}>
        <div className="d-flex flex-column">
          {sortedItems.map((item) => {
            const isLoading = loadingItemId === item.id;
            const typeName = item.type_rajutan?.nama || '-';

            return (
              <div
                key={item.id}
                className="position-relative pb-2 mb-2"
                style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}
              >
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

                <Card
                  className="border-0 rounded-3 px-2 py-2"
                  style={{
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                  }}
                >
                  {isMobile ? (
                    // Mobile layout
                    <div
                      className="d-flex align-items-center justify-content-between gap-2"
                      style={{ fontSize: '0.45rem' }}
                    >
                      <Image
                        src={item.url_gambar}
                        rounded
                        style={{
                          height: 40,
                          width: 40,
                          objectFit: 'cover',
                          flexShrink: 0,
                        }}
                      />
                      <div className="d-flex flex-column" style={{ minWidth: 50 }}>
                        <div
                          className="fw-semibold"
                          style={{ cursor: 'pointer', color: '#495057', fontSize: '1rem' }}
                          onClick={() => navigate(`/admin-dashboard/rajutan/detail/${item.id}`)}
                          onMouseEnter={(e) => (e.currentTarget.style.color = '#198754')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = '#495057')}
                        >
                          {item.nama}
                        </div>
                        <div className="text-muted" style={{fontSize: '0.5rem'}}>{typeName}</div>
                      </div>
                      <div className="d-flex flex-column align-items-start" style={{ minWidth: 60 }}>
                        <div style={{fontSize: '0.8rem'}} >Rp {item.price.toLocaleString()}</div>
                        <div className="d-flex gap-1">
                          <span>❤️ {item.count_like}</span>
                          <span>⭐ {item.count_favorite}</span>
                        </div>
                      </div>
                      <div className="d-flex flex-column align-items-center" style={{ minWidth: 45 }}>
                        <Badge
                          bg={item.status === 'ready' ? 'success' : 'warning'}
                          className="text-capitalize mb-1"
                          style={{ fontSize: '0.45rem' }}
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
                          style={{ transform: 'scale(0.75)' }}
                        />
                      </div>
                      <div className="d-flex flex-column gap-1">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="px-1 py-0"
                          style={{ fontSize: '0.45rem' }}
                          onClick={() => navigate(`/admin-dashboard/rajutan/edit/${item.id}`)}
                        >
                          <BsPencil />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="px-1 py-0"
                          style={{ fontSize: '0.45rem' }}
                          onClick={() => onDelete(item.id)}
                        >
                          <BsTrash />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // Desktop layout
                    <Row className="align-items-center small">
                      <Col md={2}>
                        <Image
                          src={item.url_gambar}
                          rounded
                          fluid
                          style={{ height: 80, objectFit: 'cover' }}
                        />
                      </Col>
                      <Col md={3}>
                        <div
                          className="fw-semibold"
                          style={{ cursor: 'pointer', color: '#495057' }}
                          onClick={() => navigate(`/admin-dashboard/rajutan/detail/${item.id}`)}
                          onMouseEnter={(e) => (e.currentTarget.style.color = '#198754')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = '#495057')}
                        >
                          {item.nama}
                        </div>
                        <div className="text-muted">{typeName}</div>
                      </Col>
                      <Col md={3}>
                        <div>Rp {item.price.toLocaleString()}</div>
                        <div className="d-flex gap-2 mt-1 text-muted">
                          <span>❤️ {item.count_like}</span>
                          <span>⭐ {item.count_favorite}</span>
                        </div>
                      </Col>
                      <Col md={2}>
                        <Badge
                          bg={item.status === 'ready' ? 'success' : 'warning'}
                          className="text-capitalize"
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
                          className="mt-1"
                        />
                      </Col>
                      <Col md={2} className="d-flex gap-1 justify-content-end">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => navigate(`/admin-dashboard/rajutan/edit/${item.id}`)}
                        >
                          <BsPencil />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => onDelete(item.id)}
                        >
                          <BsTrash />
                        </Button>
                      </Col>
                    </Row>
                  )}
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

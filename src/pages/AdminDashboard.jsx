// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { BsPlus, BsPencil, BsTrash, BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import '../styles/profile-ghibli.css';

const API_BASE_URL = 'https://lautyarn-api-nixpacksstartcmd.up.railway.app';

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();
  const [rajutanList, setRajutanList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentRajutan, setCurrentRajutan] = useState({ nama: '', deskripsi: '' });
  const [selectedId, setSelectedId] = useState(null);

  const fetchRajutan = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/rajutan/?skip=0&limit=100`);
      if (!response.ok) throw new Error('Gagal memuat rajutan');
      const data = await response.json();
      setRajutanList(data);
    } catch (err) {
      console.error('Error fetchRajutan:', err);
    }
  };

  useEffect(() => {
    fetchRajutan();
  }, []);

  const handleShowModal = (rajutan = null) => {
    if (rajutan) {
      setCurrentRajutan({ nama: rajutan.nama, deskripsi: rajutan.deskripsi });
      setSelectedId(rajutan.id);
      setEditMode(true);
    } else {
      setCurrentRajutan({ nama: '', deskripsi: '' });
      setSelectedId(null);
      setEditMode(false);
    }
    setShowModal(true);
  };

  const handleSave = async () => {
    const method = editMode ? 'PUT' : 'POST';
    const url = editMode
      ? `${API_BASE_URL}/rajutan/${selectedId}`
      : `${API_BASE_URL}/rajutan`;

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentRajutan),
      });
      if (!response.ok) throw new Error('Gagal menyimpan rajutan');
      setShowModal(false);
      fetchRajutan();
    } catch (err) {
      console.error('Error handleSave:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus rajutan ini?')) return;
    try {
      const response = await fetch(`${API_BASE_URL}/rajutan/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Gagal menghapus rajutan');
      fetchRajutan();
    } catch (err) {
      console.error('Error handleDelete:', err);
    }
  };

  return (
    <div className="ghibli-profile-bg min-vh-100 py-4 px-3 px-md-5">
      <Button
        variant="link"
        className="text-decoration-none ghibli-back-btn mb-4"
        onClick={() => navigate('/')}
      >
        <BsArrowLeft className="me-1" /> Kembali
      </Button>

      <h2 className="ghibli-font text-center mb-4">Dashboard Admin</h2>

      <Container className="mb-4">
        <Row>
          <Col md={6}><strong>Nama:</strong> {user?.nama || '-'}</Col>
          <Col md={6}><strong>No. Telepon:</strong> {user?.nomor_telepon || '-'}</Col>
        </Row>
      </Container>

      <Container>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-semibold">Daftar Rajutan</h5>
          <Button onClick={() => navigate('/admin-dashboard/create')} className="ghibli-edit-btn rounded-pill px-3">
            <BsPlus className="me-1" />Tambah
          </Button>


        </div>

        {rajutanList.map((item) => (
          <Row key={item.id} className="border-bottom py-3 align-items-center">
            <Col xs={12} md={2}>
              {item.url_gambar && (
                <img src={item.url_gambar} alt={item.nama} className="img-fluid rounded shadow-sm" style={{ maxHeight: '80px' }} />
              )}
            </Col>
            <Col xs={12} md={3}><strong>{item.nama}</strong></Col>
            <Col xs={12} md={4}>{item.deskripsi}</Col>
            <Col xs={12} md={3} className="text-md-end mt-2 mt-md-0">
              <Button
                variant="outline-primary"
                size="sm"
                className="me-2"
                onClick={() => handleShowModal(item)}
              >
                <BsPencil />
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleDelete(item.id)}
              >
                <BsTrash />
              </Button>
            </Col>
          </Row>
        ))}
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Rajutan' : 'Tambah Rajutan'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nama Rajutan</Form.Label>
              <Form.Control
                type="text"
                value={currentRajutan.nama}
                onChange={(e) => setCurrentRajutan({ ...currentRajutan, nama: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={currentRajutan.deskripsi}
                onChange={(e) => setCurrentRajutan({ ...currentRajutan, deskripsi: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Batal</Button>
          <Button variant="primary" onClick={handleSave}>Simpan</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminDashboard;

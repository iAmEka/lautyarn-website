import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BsArrowLeft, BsPlus } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import RajutanTable from '../components/admindashboard/RajutanTable';
import SidebarMenu from '../components/admindashboard/SidebarMenu';
import AdminInfoCard from '../components/admindashboard/AdminInfoCard';
import RajutanModal from '../components/admindashboard/RajutanModal';

const API_BASE_URL = 'https://lautyarn-api-nixpacksstartcmd.up.railway.app';

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('rajutan');
  const [rajutanList, setRajutanList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentRajutan, setCurrentRajutan] = useState({ nama: '', deskripsi: '' });
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchRajutan();
  }, []);

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

  const handleToggleStatus = async (item) => {
    const newStatus = item.status === 'ready' ? 'pre_order' : 'ready';
    const updatedData = { ...item, status: newStatus };

    try {
      const response = await fetch(`${API_BASE_URL}/rajutan/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error('Gagal mengubah status');
      fetchRajutan();
    } catch (err) {
      console.error('Error toggle status:', err);
    }
  };

  const renderContent = () => {
    if (activeView === 'rajutan') {
      return (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold text-secondary mb-0">🧵 Daftar Rajutan</h5>
            <Button
              onClick={() => handleShowModal()}
              variant="outline-warning"
              size="sm"
            >
              <BsPlus /> Tambah
            </Button>
          </div>
          <RajutanTable
            items={rajutanList}
            onEdit={handleShowModal}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
          />
        </>
      );
    }

    return (
      <div className="text-center text-muted small mt-4">
        <p><strong>{activeView.toUpperCase()}</strong> belum tersedia</p>
      </div>
    );
  };

  return (
    <div className="py-4 px-3 bg-light min-vh-100">
      <Container fluid>
        <Button
          variant="link"
          className="text-decoration-none mb-4 text-muted"
          onClick={() => navigate('/')}
        >
          <BsArrowLeft className="me-1" /> Kembali
        </Button>

        <h2 className="text-center mb-4 fw-bold text-dark">Dashboard Admin</h2>

        <Row className="gx-4 gy-4">
          <Col xs={12} lg={9}>
            {renderContent()}
          </Col>

          <Col xs={12} lg={3}>
            <SidebarMenu activeView={activeView} setActiveView={setActiveView} />
            <AdminInfoCard user={user} />
          </Col>
        </Row>
      </Container>

      <RajutanModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleSave}
        editMode={editMode}
        currentRajutan={currentRajutan}
        setCurrentRajutan={setCurrentRajutan}
      />
    </div>
  );
};

export default AdminDashboard;

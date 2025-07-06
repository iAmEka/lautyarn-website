import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Dropdown,
} from 'react-bootstrap';
import { BsArrowLeft, BsPlus, BsList } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import RajutanTable from '../components/admindashboard/RajutanTable';
import SidebarMenu from '../components/admindashboard/SidebarMenu';
import AdminInfoCard from '../components/admindashboard/AdminInfoCard';
import CustomerTable from '../components/admindashboard/CustomerTable';
import AdminTable from '../components/admindashboard/AdminTable';

import GhibliLoader from '../components/GhibliLoader';
import TypeTable from '../components/admindashboard/TypeTable';


const API_BASE_URL = 'https://lautyarn-api-nixpacksstartcmd.up.railway.app';

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('rajutan');
  const [rajutanList, setRajutanList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentRajutan, setCurrentRajutan] = useState({ nama: '', deskripsi: '' });
  const [selectedId, setSelectedId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loadingItemId, setLoadingItemId] = useState(null); // ✅ Loading per item

  useEffect(() => {
    fetchRajutan();
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchRajutan = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/rajutan/?skip=0&limit=100`);
      if (!response.ok) throw new Error('Gagal memuat rajutan');
      const data = await response.json();
      setRajutanList(data);
    } catch (err) {
      console.error('Error fetchRajutan:', err);
    } finally {
      setIsLoading(false);
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
    setLoadingItemId(item.id); // ✅ Set loading hanya untuk item ini

    try {
      const response = await fetch(`${API_BASE_URL}/rajutan/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error('Gagal mengubah status');

      // ✅ Update data lokal tanpa reload semua
      setRajutanList((prevList) =>
        prevList.map((rajutan) =>
          rajutan.id === item.id ? { ...rajutan, status: newStatus } : rajutan
        )
      );
    } catch (err) {
      console.error('Error toggle status:', err);
    } finally {
      setLoadingItemId(null); // ✅ Reset loading
    }
  };

  const renderContent = () => {
    if (isLoading && activeView === 'rajutan') return <GhibliLoader />;

    if (activeView === 'rajutan') {
      return (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold text-secondary mb-0">🧵 Daftar Rajutan</h5>
            <OverlayTrigger
                placement="left"
                overlay={<Tooltip id="tooltip-tambah">Tambah Rajutan</Tooltip>}
              >
                <Button
                  onClick={() => navigate('/rajutan/create')}
                  variant="outline-warning"
                  size="sm"
                  className="d-flex align-items-center justify-content-center p-1"
                  style={{ width: '30px', height: '30px', borderRadius: '8px' }}
                >
                  <BsPlus size={16} />
                </Button>
              </OverlayTrigger>
          </div>

          <RajutanTable
            items={rajutanList}
            onEdit={handleShowModal}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
            loadingItemId={loadingItemId} // ✅ Kirim ke RajutanTable
          />
        </>
      );
    }

    if (activeView === 'type_rajutan') {
      return <TypeTable />;
    }
    if (activeView === 'customer') {
      return <CustomerTable />;
    }
    if (activeView === 'admin') {
      return <AdminTable />;
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

        <div className="d-flex justify-content-between align-items-center mb-2">
          <h2 className="fw-bold text-dark">Dashboard Admin</h2>

          {isMobile && (
            <Dropdown show={showDropdown} onToggle={() => setShowDropdown(!showDropdown)}>
              <Dropdown.Toggle as={Button} variant="outline-secondary" size="sm">
                <BsList size={20} />
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                <SidebarMenu activeView={activeView} setActiveView={setActiveView} />
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>

        <Row className="gx-4 gy-4">
          <Col xs={12} lg={9}>
            {renderContent()}
          </Col>

          {!isMobile && (
            <Col xs={12} lg={3}>
              <Card className="mb-3">
                <Card.Body>
                  <h6 className="text-muted mb-3">📂 Daftar Lainnya</h6>
                  <SidebarMenu activeView={activeView} setActiveView={setActiveView} />
                </Card.Body>
              </Card>
              <AdminInfoCard user={user} />
            </Col>
          )}
        </Row>
      </Container>

      
    </div>
  );
};

export default AdminDashboard;
  
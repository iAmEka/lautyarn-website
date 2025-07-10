import React from 'react';
import { Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import '../styles/profile-ghibli.css';

const Profile = ({ user, userRole, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      if (onLogout) onLogout();
      navigate('/');
      alert('Berhasil logout!');
    } catch (error) {
      alert('Gagal logout: ' + error.message);
    }
  };

  if (!user) {
    return (
      <Container fluid className="ghibli-profile-bg d-flex align-items-center justify-content-center vh-100">
        <h4 className="text-muted">Anda belum login.</h4>
      </Container>
    );
  }

  return (
    <div className="ghibli-profile-bg text-ghibli">
      <Container fluid className="py-3 px-3 px-md-5">
        {/* Tombol kembali */}
        <div className="mb-4">
          <Button
            variant="link"
            className="text-decoration-none ghibli-back-btn"
            onClick={() => navigate('/')}
          >
            <BsArrowLeft size={20} className="me-2" /> Kembali
          </Button>
        </div>

        <h2 className="ghibli-font mb-4 text-center">Profil Pengguna</h2>

        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8} xl={7}>
            <Row className="mb-3">
              <Col sm={4} className="fw-semibold">Nama:</Col>
              <Col sm={8}>{user.nama}</Col>
            </Row>
            <Row className="mb-3">
              <Col sm={4} className="fw-semibold">Email:</Col>
              <Col sm={8}>{user.email}</Col>
            </Row>
            <Row className="mb-3">
              <Col sm={4} className="fw-semibold">Username:</Col>
              <Col sm={8}><code>{user.username}</code></Col>
            </Row>
            <Row className="mb-3">
              <Col sm={4} className="fw-semibold">UID:</Col>
              <Col sm={8}><span className="text-muted">{user.uid}</span></Col>
            </Row>
            <Row className="mb-3">
              <Col sm={4} className="fw-semibold">No. Telepon:</Col>
              <Col sm={8}>{user.nomor_telepon || '-'}</Col>
            </Row>
            <Row className="mb-4">
              <Col sm={4} className="fw-semibold">Alamat:</Col>
              <Col sm={8}>{user.alamat || '-'}</Col>
            </Row>
            <Row className="mb-4">
              <Col sm={4} className="fw-semibold">Peran:</Col>
              <Col sm={8}><span className="fw-bold text-info">{userRole}</span></Col>
            </Row>

            {/* Tombol Aksi */}
            <div className="text-end mt-4">
              <ButtonGroup>
                <Button
                  variant="outline-primary"
                  className="rounded-pill px-4"
                  onClick={() => navigate('/update-profile')}
                >
                  Edit Profil
                </Button>
                <Button
                  variant="outline-danger"
                  className="rounded-pill px-4 ms-2"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </ButtonGroup>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;

import React, { useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import axios from 'axios';
import '../styles/profile-ghibli.css';

const API_BASE_URL = 'https://lautyarn-api-nixpacksstartcmd.up.railway.app';

const UpdateProfile = ({ user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: user?.nama || '',
    username: user?.username || '',
    nomor_telepon: user?.nomor_telepon || '',
    alamat: user?.alamat || '',
    role: user?.role || 'guest', // ← WAJIB karena backend butuh role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Kirim PUT request ke endpoint
      const res = await axios.put(`${API_BASE_URL}/users/${user.id}`, formData);
      if (res.status === 200) {
        alert('Profil berhasil diperbarui!');
        navigate('/profile');
      } else {
        throw new Error('Gagal memperbarui');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Gagal memperbarui profil');
    }
  };

  return (
    <div className="ghibli-profile-bg">
      <Container fluid className="py-3 px-3 px-md-5">
        <div className="mb-4">
          <Button variant="link" className="text-decoration-none ghibli-back-btn" onClick={() => navigate('/profile')}>
            <BsArrowLeft size={20} className="me-1" /> Kembali
          </Button>
        </div>

        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8} xl={7}>
            <h2 className="text-center mb-4 ghibli-font">Edit Profil</h2>
            <Form onSubmit={handleSubmit} className="ghibli-form p-4 shadow-sm">
              <Form.Group className="mb-3">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email (tidak bisa diubah)</Form.Label>
                <Form.Control type="email" value={user.email} disabled />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>UID (tidak bisa diubah)</Form.Label>
                <Form.Control type="text" value={user.uid} disabled />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>No. Telepon</Form.Label>
                <Form.Control
                  type="text"
                  name="nomor_telepon"
                  value={formData.nomor_telepon}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Alamat</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                />
              </Form.Group>

              <div className="text-end">
                <Button type="submit" variant="primary" className="ghibli-edit-btn rounded-pill px-4">
                  Simpan Perubahan
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UpdateProfile;

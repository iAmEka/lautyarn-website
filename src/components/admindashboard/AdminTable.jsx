import React, { useEffect, useState } from 'react';
import { Spinner, Alert, Form, InputGroup } from 'react-bootstrap';

const API_URL = 'https://lautyarn-api-nixpacksstartcmd.up.railway.app/users/';

const AdminTable = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Gagal mengambil data user');
        const data = await response.json();
        const filtered = data.filter((user) => user.role === 'admin');
        setAdmins(filtered);
      } catch (err) {
        console.error('Error fetchAdmins:', err);
        setError('Terjadi kesalahan saat mengambil data admin.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const filteredAdmins = admins.filter((user) => {
    const lower = searchTerm.toLowerCase();
    return (
      user.nama?.toLowerCase().includes(lower) ||
      user.nomor_telepon?.toLowerCase().includes(lower) ||
      user.alamat?.toLowerCase().includes(lower)
    );
  });

  if (loading) {
    return (
      <div className="text-center my-3">
        <Spinner animation="border" variant="secondary" size="sm" />
        <span className="ms-2 small">Memuat admin...</span>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      <h6 className="fw-bold mb-3 text-dark" style={{ fontFamily: 'Georgia, serif' }}>
        👮 Daftar Admin
      </h6>

      {/* Input Pencarian */}
      <InputGroup size="sm" className="mb-3">
        <InputGroup.Text>Cari</InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Cari nama, telepon, atau alamat..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      {filteredAdmins.length === 0 ? (
        <p className="text-muted small">Tidak ada admin yang cocok.</p>
      ) : (
        <div className="d-flex flex-column gap-2">
          {filteredAdmins.map((user) => (
            <div
              key={user.id}
              className="px-3 py-2 border-bottom"
              style={{
                fontSize: '0.7rem',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
              }}
            >
              <div
                className="d-flex flex-nowrap align-items-start gap-3"
                style={{ minWidth: '550px' }}
              >
                <div style={{ minWidth: '120px' }}>
                  <strong>Nama:</strong>
                  <div>{user.nama}</div>
                </div>
                <div style={{ minWidth: '180px' }}>
                  <strong>Email:</strong>
                  <div>{user.email}</div>
                </div>
                <div style={{ minWidth: '130px' }}>
                  <strong>Username:</strong>
                  <div>{user.username}</div>
                </div>
                <div style={{ minWidth: '120px' }}>
                  <strong>Telepon:</strong>
                  <div>{user.nomor_telepon}</div>
                </div>
                <div style={{ minWidth: '200px' }}>
                  <strong>Alamat:</strong>
                  <div>{user.alamat}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminTable;

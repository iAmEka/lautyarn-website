import React, { useEffect, useState } from 'react';
import { Spinner, Alert } from 'react-bootstrap';

const API_URL = 'https://lautyarn-api-nixpacksstartcmd.up.railway.app/users/';

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Gagal mengambil data user');
        const data = await response.json();
        const filtered = data.filter((user) => user.role === 'customer');
        setCustomers(filtered);
      } catch (err) {
        console.error('Error fetchCustomers:', err);
        setError('Terjadi kesalahan saat mengambil data customer.');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-3">
        <Spinner animation="border" variant="secondary" size="sm" />
        <span className="ms-2 small">Memuat customer...</span>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (customers.length === 0) {
    return <p className="text-muted small">Belum ada data customer.</p>;
  }

  return (
    <div>
      <h6 className="fw-bold mb-3 text-dark" style={{ fontFamily: 'Georgia, serif' }}>
        👥 Daftar Customer
      </h6>

      <div className="d-flex flex-column gap-2">
        {customers.map((user) => (
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
    </div>
  );
};

export default CustomerTable;

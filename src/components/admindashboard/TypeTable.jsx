import React, { useEffect, useState } from 'react';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';
import { BsTrash, BsPlus } from 'react-icons/bs';
import axios from 'axios';

const API_BASE_URL = 'https://lautyarn-api-nixpacksstartcmd.up.railway.app';

const TypeTable = () => {
  const [types, setTypes] = useState([]);
  const [newTypeName, setNewTypeName] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchTypes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/type-rajutan/`);
      setTypes(response.data);
    } catch (err) {
      console.error('❌ Error fetchTypeRajutan:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  const handleAddType = async () => {
    const trimmedName = newTypeName.trim();
    if (!trimmedName) {
      alert('⚠️ Nama tipe tidak boleh kosong');
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/type-rajutan/`, { nama: trimmedName });
      setNewTypeName('');
      fetchTypes(); // refresh
    } catch (err) {
      console.error('❌ Gagal menambahkan tipe:', err);
      alert('Gagal menambahkan tipe rajutan.');
    }
  };

  const handleDeleteType = async (id) => {
    if (!window.confirm('Yakin ingin menghapus tipe ini?')) return;

    try {
      await axios.delete(`${API_BASE_URL}/type-rajutan/${id}`);
      fetchTypes(); // refresh
    } catch (err) {
      console.error('❌ Gagal menghapus tipe:', err);
      alert('Gagal menghapus tipe rajutan.');
    }
  };

  return (
    <div className="mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold text-secondary mb-0">🛠️ Daftar Tipe Rajutan</h5>
      </div>

      <InputGroup className="mb-4">
        <Form.Control
          placeholder="Masukkan nama tipe baru"
          value={newTypeName}
          onChange={(e) => setNewTypeName(e.target.value)}
        />
        <Button variant="success" onClick={handleAddType}>
          <BsPlus /> Tambah
        </Button>
      </InputGroup>

      {loading ? (
        <p className="text-muted">Memuat data tipe rajutan...</p>
      ) : (
        <div className="table-responsive">
          <Table hover borderless responsive className="align-middle">
            <thead className="table-light small text-muted">
              <tr>
                <th style={{ width: '5%' }}>#</th>
                <th>Nama Tipe</th>
                <th className="text-end">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {types.map((type, index) => (
                <tr key={type.id}>
                  <td>{index + 1}</td>
                  <td>{type.nama}</td>
                  <td className="text-end">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteType(type.id)}
                    >
                      <BsTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default TypeTable;

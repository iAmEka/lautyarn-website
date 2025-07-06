import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup, Spinner, Alert } from 'react-bootstrap';
import { BsTrash, BsPlus, BsSearch } from 'react-icons/bs';
import axios from 'axios';

const API_BASE_URL = 'https://lautyarn-api-nixpacksstartcmd.up.railway.app';

const TypeTable = () => {
  const [types, setTypes] = useState([]);
  const [filteredTypes, setFilteredTypes] = useState([]);
  const [newTypeName, setNewTypeName] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTypes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/type-rajutan/`);
      setTypes(response.data);
      setFilteredTypes(response.data);
    } catch (err) {
      console.error('❌ Error fetchTypeRajutan:', err);
      setError('Gagal memuat data tipe rajutan.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = types.filter((type) =>
      type.nama.toLowerCase().includes(term)
    );
    setFilteredTypes(filtered);
  }, [searchTerm, types]);

  const handleAddType = async () => {
    const trimmedName = newTypeName.trim();
    if (!trimmedName) return alert('⚠️ Nama tipe tidak boleh kosong');

    try {
      await axios.post(`${API_BASE_URL}/type-rajutan/`, { nama: trimmedName });
      setNewTypeName('');
      setShowInput(false);
      fetchTypes();
    } catch (err) {
      console.error('❌ Gagal menambahkan tipe:', err);
      alert('Gagal menambahkan tipe rajutan.');
    }
  };

  const handleDeleteType = async (id) => {
    if (!window.confirm('Yakin ingin menghapus tipe ini?')) return;

    try {
      await axios.delete(`${API_BASE_URL}/type-rajutan/${id}`);
      fetchTypes();
    } catch (err) {
      console.error('❌ Gagal menghapus tipe:', err);
      alert('Gagal menghapus tipe rajutan.');
    }
  };

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="fw-bold text-dark mb-0" style={{ fontFamily: 'Georgia, serif' }}>
          🧵 Daftar Tipe Rajutan
        </h6>
        <Button
          size="sm"
          variant={showInput ? 'secondary' : 'success'}
          onClick={() => setShowInput(!showInput)}
          title={showInput ? 'Tutup Form' : 'Tambah Tipe'}
        >
          <BsPlus />
        </Button>
      </div>

      {/* 🔍 Input Pencarian */}
      <InputGroup className="mb-3" size="sm">
        <InputGroup.Text>
          <BsSearch />
        </InputGroup.Text>
        <Form.Control
          placeholder="Cari nama tipe rajutan..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      {/* ➕ Form Tambah Tipe */}
      {showInput && (
        <InputGroup className="mb-3" size="sm">
          <Form.Control
            placeholder="Masukkan nama tipe baru"
            value={newTypeName}
            onChange={(e) => setNewTypeName(e.target.value)}
            autoFocus
          />
          <Button variant="primary" onClick={handleAddType}>
            Simpan
          </Button>
        </InputGroup>
      )}

      {/* ⏳ Loading/Error */}
      {loading && (
        <div className="text-center my-3">
          <Spinner animation="border" variant="secondary" size="sm" />
          <span className="ms-2 small">Memuat tipe rajutan...</span>
        </div>
      )}

      {error && <Alert variant="danger" className="small">{error}</Alert>}

      {/* 📄 List Tipe */}
      {!loading && filteredTypes.length === 0 && (
        <p className="text-muted small">Tidak ditemukan tipe rajutan yang cocok.</p>
      )}

      {!loading && filteredTypes.length > 0 && (
        <div className="d-flex flex-column gap-2">
          {filteredTypes.map((type, index) => (
            <div
              key={type.id}
              className="px-3 py-2 border-bottom d-flex justify-content-between align-items-center"
              style={{
                fontSize: '0.85rem',
                lineHeight: '1.3',
                borderColor: 'rgba(0,0,0,0.06)',
              }}
            >
              <div className="d-flex align-items-center gap-2 text-muted">
                <span className="fw-semibold text-dark">{index + 1}.</span>
                <span>{type.nama}</span>
              </div>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleDeleteType(type.id)}
              >
                <BsTrash />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TypeTable;

// src/pages/CreateRajutan.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import ImageUploaderWithCrop from "../../components/ImageUploaderWithCrop";
import '../../styles/CreateRajutan.css'; // Pindahkan ke folder styles

const API_BASE_URL = 'https://lautyarn-api-nixpacksstartcmd.up.railway.app';

const CreateRajutan = () => {
  const navigate = useNavigate();

  const [nama, setNama] = useState('');
  const [countLike, setCountLike] = useState(0);
  const [countFavorite, setCountFavorite] = useState(0);
  const [colorCode, setColorCode] = useState('');
  const [price, setPrice] = useState(0);
  const [urlGambar, setUrlGambar] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [status, setStatus] = useState('ready');

  const [typeOptions, setTypeOptions] = useState([]);
  const [selectedTypeId, setSelectedTypeId] = useState('');

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/type-rajutan/`);
        setTypeOptions(response.data);
      } catch (error) {
        console.error('Gagal mengambil tipe rajutan:', error);
        alert('Gagal mengambil daftar tipe rajutan. Silakan periksa koneksi.');
      }
    };

    fetchTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const rajutanData = {
      nama: nama.trim(),
      count_like: parseInt(countLike),
      count_favorite: parseInt(countFavorite),
      colorcode: colorCode.split(',').map((c) => c.trim()).filter(Boolean),
      price: parseInt(price),
      url_gambar: urlGambar.trim(),
      deskripsi: deskripsi.trim(),
      status: status,
      id_type: selectedTypeId,
    };

    try {
      await axios.post(`${API_BASE_URL}/rajutan/`, rajutanData);
      alert('✅ Berhasil menambahkan rajutan!');
      navigate('/admin-dashboard');
    } catch (err) {
      console.error('❌ Gagal menyimpan rajutan:', err);
      alert('Gagal menambahkan rajutan. Silakan cek kembali input atau koneksi.');
    }
  };

  return (
    <div className="ghibli-background">
      <Container className="py-5">
        <h2 className="text-center mb-5 ghibli-title">🌸 Tambah Rajutan Baru 🌸</h2>
        <Form onSubmit={handleSubmit} className="px-4 py-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.0)' }}>
          <Row>
            <Col md={5} className="text-center">
              <Form.Group className="mb-3">
                <Form.Label className="ghibli-label">Upload Gambar</Form.Label>
                <ImageUploaderWithCrop setImageUrl={setUrlGambar} />
                <div className="mt-3">
                  {urlGambar ? (
                    <div className="ghibli-image-preview">
                      <img
                        src={urlGambar}
                        alt="Preview"
                        className="ghibli-image-preview-img"
                      />
                    </div>
                  ) : (
                    <div className="ghibli-image-preview ghibli-image-placeholder">
                      🌸 Preview gambar akan muncul di sini 🌸
                    </div>
                  )}

                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="ghibli-label">Harga (Rp)</Form.Label>
                <Form.Control
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min="0"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="ghibli-label">Status</Form.Label>
                <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="ready">Ready</option>
                  <option value="pre_order">Pre Order</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="ghibli-label">Pilih Tipe Rajutan</Form.Label>
                <Form.Select
                  value={selectedTypeId}
                  onChange={(e) => setSelectedTypeId(e.target.value)}
                  required
                >
                  <option value="">-- Pilih Tipe --</option>
                  {typeOptions.map((type) => (
                    <option key={type.id} value={type.id}>{type.nama}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={7}>
              <Form.Group className="mb-3">
                <Form.Label className="ghibli-label">Nama Rajutan</Form.Label>
                <Form.Control
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="ghibli-label">Jumlah Like</Form.Label>
                <Form.Control
                  type="number"
                  value={countLike}
                  onChange={(e) => setCountLike(e.target.value)}
                  min="0"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="ghibli-label">Jumlah Favorite</Form.Label>
                <Form.Control
                  type="number"
                  value={countFavorite}
                  onChange={(e) => setCountFavorite(e.target.value)}
                  min="0"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="ghibli-label">Color Code (pisahkan dengan koma)</Form.Label>
                <Form.Control
                  type="text"
                  value={colorCode}
                  onChange={(e) => setColorCode(e.target.value)}
                  placeholder="#FF0000, #00FF00, #0000FF"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="ghibli-label">Deskripsi</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                />
              </Form.Group>

              <div className="text-center mt-4">
                <Button variant="secondary" className="me-3" onClick={() => navigate('/admin-dashboard')}>
                  Batal
                </Button>
                <Button variant="primary" type="submit">
                  Simpan Rajutan
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default CreateRajutan;
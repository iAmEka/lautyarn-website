import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import ImageUploaderWithCrop from '../../components/ImageUploaderWithCrop';
import '../../styles/CreateRajutan.css';

const API_BASE_URL = 'https://lautyarn-api-nixpacksstartcmd.up.railway.app';

const UpdateRajutan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nama, setNama] = useState('');
  const [countLike, setCountLike] = useState(0);
  const [countFavorite, setCountFavorite] = useState(0);
  const [colorList, setColorList] = useState([]);
  const [newColor, setNewColor] = useState('#000000');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [bahan, setBahan] = useState('');
  const [ukuran, setUkuran] = useState('');
  const [lamaPengerjaan, setLamaPengerjaan] = useState('');
  const [price, setPrice] = useState(0);
  const [urlGambar, setUrlGambar] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [status, setStatus] = useState('ready');
  const [selectedTypeId, setSelectedTypeId] = useState('');
  const [typeOptions, setTypeOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/rajutan/${id}`);
        const data = res.data;
        setNama(data.nama);
        setCountLike(data.count_like || 0);
        setCountFavorite(data.count_favorite || 0);
        setColorList(data.colorcode || []);
        setPrice(data.price);
        setUrlGambar(data.url_gambar || '');
        setDeskripsi(data.deskripsi || '');
        setStatus(data.status || 'ready');
        setSelectedTypeId(data.id_type || '');
        setBahan(data.bahan?.join(', ') || '');
        setUkuran(data.ukuran || '');
        setLamaPengerjaan(data.lama_pengerjaan || '');
      } catch (err) {
        console.error('Gagal mengambil data rajutan:', err);
        alert('Data gagal dimuat.');
      }
    };

    const fetchTypes = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/type-rajutan/`);
        setTypeOptions(res.data);
      } catch (err) {
        console.error('Gagal mengambil tipe:', err);
      }
    };

    fetchData();
    fetchTypes();
  }, [id]);

  const handleRemoveColor = (code) => {
    setColorList(colorList.filter((c) => c !== code));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const rajutanData = {
      nama: nama.trim(),
      count_like: parseInt(countLike),
      count_favorite: parseInt(countFavorite),
      colorcode: colorList,
      bahan: bahan.split(',').map((b) => b.trim()).filter(Boolean),
      ukuran: ukuran.trim(),
      lama_pengerjaan: lamaPengerjaan.trim(),
      price: parseInt(price),
      url_gambar: urlGambar.trim(),
      deskripsi: deskripsi.trim(),
      status,
      id_type: selectedTypeId,
    };

    try {
      await axios.put(`${API_BASE_URL}/rajutan/${id}`, rajutanData);
      alert('✅ Rajutan berhasil diperbarui!');
      navigate('/admin-dashboard');
    } catch (err) {
      console.error('Gagal update:', err);
      alert('Gagal memperbarui rajutan.');
    }
  };

  return (
    <div className="ghibli-background">
      <Container className="py-5">
        <h2 className="text-center mb-5 ghibli-title">✏️ Edit Rajutan ✏️</h2>
        <Form onSubmit={handleSubmit} className="px-4 py-4 fade-in" style={{ backgroundColor: 'rgba(255, 255, 255, 0.0)' }}>
          <Row>
            <Col md={5} className="text-center">
              <Form.Group className="mb-3 fade-in">
                <Form.Label className="ghibli-label">Ganti Gambar</Form.Label>
                <ImageUploaderWithCrop setImageUrl={setUrlGambar} />
                <div className="mt-3">
                  {urlGambar ? (
                    <div className="ghibli-image-preview">
                      <img src={urlGambar} alt="Preview" className="ghibli-image-preview-img" />
                    </div>
                  ) : (
                    <div className="ghibli-image-preview ghibli-image-placeholder">
                      🌸 Gambar akan muncul di sini 🌸
                    </div>
                  )}
                </div>
              </Form.Group>

              <Form.Group className="mb-3 fade-in">
                <Form.Label className="ghibli-label">Harga (Rp)</Form.Label>
                <Form.Control
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min="0"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3 fade-in">
                <Form.Label className="ghibli-label">Status</Form.Label>
                <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="ready">Ready</option>
                  <option value="pre_order">Pre Order</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3 fade-in">
                <Form.Label className="ghibli-label">Tipe Rajutan</Form.Label>
                <Form.Select value={selectedTypeId} onChange={(e) => setSelectedTypeId(e.target.value)}>
                  <option value="">-- Pilih Tipe --</option>
                  {typeOptions.map((type) => (
                    <option key={type.id} value={type.id}>{type.nama}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={7}>
              <Form.Group className="mb-3 fade-in">
                <Form.Label className="ghibli-label">Nama Rajutan</Form.Label>
                <Form.Control
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3 fade-in">
                <Form.Label className="ghibli-label">Jumlah Like</Form.Label>
                <Form.Control type="number" value={countLike} readOnly />
              </Form.Group>

              <Form.Group className="mb-3 fade-in">
                <Form.Label className="ghibli-label">Jumlah Favorite</Form.Label>
                <Form.Control type="number" value={countFavorite} readOnly />
              </Form.Group>

              <Form.Group className="mb-4 fade-in">
                <Form.Label className="ghibli-label">Warna Rajutan</Form.Label>
                <div className="d-flex align-items-center flex-wrap gap-2 mt-2">
                  {colorList.map((code, index) => (
                    <div
                      key={index}
                      className="position-relative"
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: code,
                        border: '1px solid #555',
                      }}
                    >
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleRemoveColor(code)}
                        style={{
                          position: 'absolute',
                          top: '-6px',
                          right: '-6px',
                          padding: '2px 5px',
                          fontSize: '12px',
                          lineHeight: '1',
                          borderRadius: '50%',
                          zIndex: 1,
                        }}
                      >
                        &times;
                      </Button>
                    </div>
                  ))}

                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    style={{
                      fontWeight: 'bold',
                      fontSize: '20px',
                      width: '36px',
                      height: '36px',
                      padding: '0',
                      lineHeight: '1',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    +
                  </Button>

                  {showColorPicker && (
                    <Form.Control
                      type="color"
                      value={newColor}
                      onChange={(e) => {
                        const selectedColor = e.target.value;
                        if (!colorList.includes(selectedColor)) {
                          setColorList([...colorList, selectedColor]);
                        }
                        setShowColorPicker(false);
                      }}
                      className="color-picker-appear"
                      style={{
                        width: '40px',
                        height: '40px',
                        padding: '0',
                        border: '1px solid #ccc',
                        borderRadius: '6px',
                        cursor: 'pointer',
                      }}
                    />
                  )}
                </div>
              </Form.Group>

              <Form.Group className="mb-3 fade-in">
                <Form.Label className="ghibli-label">Bahan (pisahkan dengan koma)</Form.Label>
                <Form.Control
                  type="text"
                  value={bahan}
                  onChange={(e) => setBahan(e.target.value)}
                  placeholder="benang, kancing, resleting"
                />
              </Form.Group>

              <Form.Group className="mb-3 fade-in">
                <Form.Label className="ghibli-label">Ukuran</Form.Label>
                <Form.Control
                  type="text"
                  value={ukuran}
                  onChange={(e) => setUkuran(e.target.value)}
                  placeholder="Tinggi 20cm, diameter 15cm"
                />
              </Form.Group>

              <Form.Group className="mb-3 fade-in">
                <Form.Label className="ghibli-label">Lama Pengerjaan</Form.Label>
                <Form.Control
                  type="text"
                  value={lamaPengerjaan}
                  onChange={(e) => setLamaPengerjaan(e.target.value)}
                  placeholder="3 hari"
                />
              </Form.Group>

              <Form.Group className="mb-3 fade-in">
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
                  Simpan Perubahan
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default UpdateRajutan;

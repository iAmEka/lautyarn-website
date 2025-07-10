import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { BsHeart, BsBookmark, BsShare, BsPencilSquare } from 'react-icons/bs';

const API_BASE_URL = 'https://lautyarn-api-nixpacksstartcmd.up.railway.app';

const AdminDetailRajutan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rajutan, setRajutan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/rajutan/${id}`);
        const data = await res.json();
        setRajutan(data);
      } catch (err) {
        console.error('Error loading detail:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!rajutan) return <p className="text-center mt-5">Data tidak ditemukan.</p>;

  const {
    nama = 'Rajutan Tanpa Nama',
    deskripsi = '',
    price = 0,
    url_gambar,
    status = 'ready',
    count_like = 0,
    count_favorite = 0,
    colorcode = [],
    created_at,
    type_rajutan = { nama: '-' },
    bahan = [],
    ukuran = '-',
    lama_pengerjaan = '-',
  } = rajutan;

  return (
    <div className="ghibli-background py-5">
      <div className="container">
        <div className="row g-4">
          {/* LEFT */}
          <div className="col-md-5 text-center">
            <div className="ghibli-image-preview">
              <img
                src={url_gambar}
                alt={nama}
                className="img-fluid rounded border border-primary ghibli-image-preview-img"
              />
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3 px-2">
              <div className="d-flex gap-3">
                <span><BsHeart className="me-1" /> {count_like}</span>
                <span><BsBookmark className="me-1" /> {count_favorite}</span>
              </div>
              <div className="d-flex gap-3">
                <BsShare size={18} style={{ cursor: 'pointer' }} />
                <BsPencilSquare
                  size={18}
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/admin-dashboard/rajutan/edit/${id}`)}
                />
              </div>
            </div>
            <h4 className="mt-3 fw-bold text-center ghibli-title">{nama}</h4>
            <small className="text-muted">Jenis: {type_rajutan?.nama}</small>
            <p className="mt-2 text-danger fw-semibold">
              Release at: {new Date(created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })},{' '}
              {new Date(created_at).toLocaleDateString('id-ID')}
            </p>
          </div>

          {/* RIGHT */}
          <div className="col-md-7">
            <h3 className="fw-bold ghibli-title">🌸 Detail Rajutan 🌸</h3>
            <div className="ghibli-content-box">
              <p><strong>Nama:</strong> {nama}</p>
              <p><strong>Jenis:</strong> {type_rajutan?.nama}</p>

              <div className="mb-3">
                <strong>Warna:</strong>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {colorcode.length > 0 ? colorcode.map((code, idx) => (
                    <div
                      key={idx}
                      title={code}
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        backgroundColor: code,
                        border: '1px solid #555'
                      }}
                    />
                  )) : <p className="text-muted">Tidak ada warna</p>}
                </div>
              </div>

              <p><strong>Status:</strong> {status}</p>
              <p><strong>Harga:</strong> Rp{price.toLocaleString('id-ID')}</p>
              <p><strong>Bahan:</strong> {Array.isArray(bahan) ? bahan.join(', ') : bahan}</p>
              <p><strong>Ukuran:</strong> {ukuran}</p>
              <p><strong>Lama Pengerjaan:</strong> {lama_pengerjaan}</p>

              <p className="mt-3"><strong>Deskripsi:</strong></p>
              <div className="ghibli-description-box">
                {deskripsi || 'Belum ada deskripsi...'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDetailRajutan;

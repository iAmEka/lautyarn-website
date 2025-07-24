import React, { useEffect, useState, useRef } from 'react';

const API_BASE_URL = 'https://lautyarn-api-nixpacksstartcmd.up.railway.app';

const Store = ({ user }) => {
  const [rajutan, setRajutan] = useState([]);
  const [typeRajutan, setTypeRajutan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  // Filter states
  const [sortBy, setSortBy] = useState('nama_asc');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterPriceMin, setFilterPriceMin] = useState('');
  const [filterPriceMax, setFilterPriceMax] = useState('');

  const itemsPerPage = isMobile ? 8 : 16;
  const cardStyle = { width: isMobile ? 'calc(50% - 0.5rem)' : 'calc(25% - 0.75rem)' };

  const filterRef = useRef();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/rajutan/`)
      .then(res => (res.ok ? res.json() : Promise.reject('Gagal fetch produk')))
      .then(setRajutan)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/type-rajutan/`)
      .then(res => res.json())
      .then(setTypeRajutan)
      .catch(() => setTypeRajutan([]));
  }, []);

  // Tutup dropdown jika klik di luar dan jalankan filter
  useEffect(() => {
    function handleClickOutside(event) {
      if (filterOpen && filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [filterOpen]);

  // Fungsi reset filter ke default
  const resetFilter = () => {
    setSortBy('nama_asc');
    setFilterStatus('');
    setFilterType('');
    setFilterPriceMin('');
    setFilterPriceMax('');
  };

  // Fungsi filter dan sort
  const getFilteredSortedItems = () => {
    let items = rajutan.filter(item => {
      const term = searchTerm.toLowerCase();
      const nama = item.nama?.toLowerCase() || '';
      const typeNama = item.type_rajutan?.nama?.toLowerCase() || '';
      return nama.includes(term) || typeNama.includes(term);
    });

    if (filterStatus) {
      items = items.filter(item => item.status === filterStatus);
    }

    if (filterType) {
      items = items.filter(item => item.id_type === filterType);
    }

    if (filterPriceMin !== '') {
      const min = Number(filterPriceMin);
      if (!isNaN(min)) items = items.filter(item => item.price >= min);
    }
    if (filterPriceMax !== '') {
      const max = Number(filterPriceMax);
      if (!isNaN(max)) items = items.filter(item => item.price <= max);
    }

    items.sort((a, b) => {
      switch (sortBy) {
        case 'nama_asc':
          return a.nama.localeCompare(b.nama);
        case 'nama_desc':
          return b.nama.localeCompare(a.nama);
        case 'harga_asc':
          return a.price - b.price;
        case 'harga_desc':
          return b.price - a.price;
        case 'like_asc':
          return a.count_like - b.count_like;
        case 'like_desc':
          return b.count_like - a.count_like;
        case 'favorite_asc':
          return a.count_favorite - b.count_favorite;
        case 'favorite_desc':
          return b.count_favorite - a.count_favorite;
        default:
          return 0;
      }
    });

    return items;
  };

  const filteredSortedItems = getFilteredSortedItems();

  const totalPages = Math.ceil(filteredSortedItems.length / itemsPerPage);
  const currentItems = filteredSortedItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset halaman ke 1 jika filter/search berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy, filterStatus, filterType, filterPriceMin, filterPriceMax]);

  if (loading) return <p className="text-center my-5">Memuat produk...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  return (
    <section style={{ backgroundColor: '#f9f9f9' }}>
      <div className="container pt-4" style={{ marginTop: 50 }}>
        <div className="d-flex align-items-center gap-2" style={{ maxWidth: 600, margin: '0 auto' }}>
          <input
            type="search"
            className="form-control flex-grow-1"
            placeholder="Cari produk..."
            style={{ height: 44 }}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <div style={{ position: 'relative' }}>
            <button
              className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
              type="button"
              style={{ height: 44, width: 44, padding: 0 }}
              onClick={() => setFilterOpen(open => !open)}
              aria-expanded={filterOpen}
              aria-haspopup="true"
            >
              <img src="/filter.png" alt="Filter" style={{ width: 24, height: 24 }} />
            </button>

            {filterOpen && (
              <div
                ref={filterRef}
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 0.25rem)',
                  right: 0,
                  backgroundColor: '#fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  borderRadius: 8,
                  padding: 12,
                  width: 280,
                  zIndex: 999,
                  fontSize: '0.6rem',
                }}
              >
                {/* Urut Nama */}
                <div className="mb-2">
                  <label className="form-label fw-semibold" style={{ fontSize: '0.6rem' }}>Urut Nama</label>
                  <select
                    className="form-select"
                    style={{ fontSize: '0.6rem', padding: '0.15rem 0.25rem' }}
                    value={sortBy === 'nama_asc' || sortBy === 'nama_desc' ? sortBy : 'nama_asc'}
                    onChange={e => setSortBy(e.target.value)}
                  >
                    <option value="nama_asc">A - Z</option>
                    <option value="nama_desc">Z - A</option>
                  </select>
                </div>

                {/* Urut Harga */}
                <div className="mb-2">
                  <label className="form-label fw-semibold" style={{ fontSize: '0.6rem' }}>Urut Harga</label>
                  <select
                    className="form-select"
                    style={{ fontSize: '0.6rem', padding: '0.15rem 0.25rem' }}
                    value={sortBy === 'harga_asc' || sortBy === 'harga_desc' ? sortBy : ''}
                    onChange={e => {
                      if (e.target.value) setSortBy(e.target.value);
                    }}
                  >
                    <option value="">--</option>
                    <option value="harga_asc">Kecil ke Besar</option>
                    <option value="harga_desc">Besar ke Kecil</option>
                  </select>
                </div>

                {/* Urut Like */}
                <div className="mb-2">
                  <label className="form-label fw-semibold" style={{ fontSize: '0.6rem' }}>Urut Like</label>
                  <select
                    className="form-select"
                    style={{ fontSize: '0.6rem', padding: '0.15rem 0.25rem' }}
                    value={sortBy === 'like_asc' || sortBy === 'like_desc' ? sortBy : ''}
                    onChange={e => {
                      if (e.target.value) setSortBy(e.target.value);
                    }}
                  >
                    <option value="">--</option>
                    <option value="like_asc">Kecil ke Besar</option>
                    <option value="like_desc">Besar ke Kecil</option>
                  </select>
                </div>

                {/* Urut Favorite */}
                <div className="mb-2">
                  <label className="form-label fw-semibold" style={{ fontSize: '0.6rem' }}>Urut Favorite</label>
                  <select
                    className="form-select"
                    style={{ fontSize: '0.6rem', padding: '0.15rem 0.25rem' }}
                    value={sortBy === 'favorite_asc' || sortBy === 'favorite_desc' ? sortBy : ''}
                    onChange={e => {
                      if (e.target.value) setSortBy(e.target.value);
                    }}
                  >
                    <option value="">--</option>
                    <option value="favorite_asc">Kecil ke Besar</option>
                    <option value="favorite_desc">Besar ke Kecil</option>
                  </select>
                </div>
                <hr style={{ 
                  margin: '1rem 0',
                  height: '5px', 
                  color: '#000000',       // Ketebalan garis
                  backgroundColor: '#000000', // Warna garis
                  border: 'none'        // Menghapus border default
                }} />



                {/* Filter status */}
                <div className="mb-2">
                  <label className="form-label fw-semibold" style={{ fontSize: '0.6rem' }}>Status</label>
                  <select
                    className="form-select"
                    style={{ fontSize: '0.6rem', padding: '0.15rem 0.25rem' }}
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value)}
                  >
                    <option value="">Semua</option>
                    <option value="ready">Ready</option>
                    <option value="pre_order">Pre_order</option>
                  </select>
                </div>

                {/* Filter jenis */}
                <div className="mb-2">
                  <label className="form-label fw-semibold" style={{ fontSize: '0.6rem' }}>Jenis</label>
                  <select
                    className="form-select"
                    style={{ fontSize: '0.6rem', padding: '0.15rem 0.25rem' }}
                    value={filterType}
                    onChange={e => setFilterType(e.target.value)}
                  >
                    <option value="">Semua</option>
                    {typeRajutan.map(type => (
                      <option key={type.id} value={type.id}>{type.nama}</option>
                    ))}
                  </select>
                </div>

                {/* Filter harga min */}
                <div className="mb-2">
                  <label className="form-label fw-semibold" style={{ fontSize: '0.6rem' }}>Harga minimum</label>
                  <input
                    type="number"
                    className="form-control"
                    style={{ fontSize: '0.6rem', padding: '0.15rem 0.25rem' }}
                    value={filterPriceMin}
                    onChange={e => setFilterPriceMin(e.target.value)}
                    placeholder="Rp 0"
                    min={0}
                  />
                </div>

                {/* Filter harga max */}
                <div className="mb-2">
                  <label className="form-label fw-semibold" style={{ fontSize: '0.6rem' }}>Harga maksimum</label>
                  <input
                    type="number"
                    className="form-control"
                    style={{ fontSize: '0.6rem', padding: '0.15rem 0.25rem' }}
                    value={filterPriceMax}
                    onChange={e => setFilterPriceMax(e.target.value)}
                    placeholder="Rp 0"
                    min={0}
                  />
                </div>

                {/* Tombol Reset dan Selesai */}
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.6rem', padding: '0.25rem 0.5rem' }}
                    onClick={resetFilter}
                  >
                    Reset
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    style={{ fontSize: '0.6rem', padding: '0.25rem 0.5rem' }}
                    onClick={() => setFilterOpen(false)}
                  >
                    Selesai
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container py-4 ">
        <div className="d-flex flex-wrap" style={{ gap: isMobile ? '0.5rem' : '1rem' }}>
          {currentItems.length > 0 ? currentItems.map(item => (
            <div
              key={item.id}
              style={{
                ...cardStyle,
                backgroundColor: '#fff',
                borderRadius: 12,
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                overflow: 'hidden',
                flex: '0 0 auto',
              }}
            >
              <div style={{ width: isMobile ? '100%' : '40%', padding: '0.5rem' }}>
                <div style={{ width: '100%', aspectRatio: '1 / 1', overflow: 'hidden', borderRadius: 8 }}>
                  <img src={item.url_gambar} alt={item.nama} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="d-flex justify-content-between mt-1" style={{ fontSize: '0.7rem', color: '#777' }}>
                  <div className="d-flex gap-2 align-items-center text-danger">
                    <span className="d-flex align-items-center gap-1">
                      <img src="/rajutan/love.png" alt="Like" style={{ width: 14, height: 14 }} />
                      {item.count_like}
                    </span>
                    <span className="d-flex align-items-center gap-1">
                      <img src="/rajutan/favorite.png" alt="Favorite" style={{ width: 14, height: 14 }} />
                      {item.count_favorite}
                    </span>
                  </div>
                  <img src="/rajutan/share.png" alt="Share" style={{ width: 16, height: 16 }} />
                </div>
              </div>
              <div
                style={{
                  width: isMobile ? '100%' : '60%',
                  padding: '0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  marginTop: isMobile ? '-1rem' : '0',
                }}
              >
                <div>
                  <p className="fw-semibold mb-1" style={{ fontSize: '0.85rem' }}>{item.nama}</p>
                  <p className="text-muted mb-1" style={{ fontSize: '0.7rem', marginTop: isMobile ? '-0.5rem' : '0' }}>
                    {item.type_rajutan?.nama}
                  </p>
                  <p className="text-success fw-bold" style={{ fontSize: '0.8rem', marginTop: isMobile ? '-0.3rem' : '0' }}>
                    Rp{item.price.toLocaleString('id-ID')}
                  </p>
                </div>
                <button
                  className="btn btn-outline-primary btn-sm w-100"
                  disabled={!user}
                  onClick={() => (!user ? alert('Silakan login untuk membeli.') : alert(`Pesan produk: ${item.nama}`))}
                  style={{ fontSize: '0.65rem', padding: '0.3rem', borderRadius: '5px', marginTop: isMobile ? '-0.8rem' : '0' }}
                >
                  Pesan
                </button>
              </div>
            </div>
          )) : (
            <p className="text-center text-muted w-100">Tidak ada produk yang sesuai filter.</p>
          )}
        </div>
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i + 1}
                    className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}
                    onClick={() => setCurrentPage(i + 1)}
                    style={{ cursor: 'pointer', fontSize: '0.85rem' }}
                  >
                    <span className="page-link">{i + 1}</span>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </section>
  );
};

export default Store;

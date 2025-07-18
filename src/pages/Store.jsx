import React, { useEffect, useState } from 'react';
import { Container, Button, Pagination } from 'react-bootstrap';
import { BsHeart, BsBookmark, BsShare } from 'react-icons/bs';

const API_BASE_URL = 'https://lautyarn-api-nixpacksstartcmd.up.railway.app';

const Store = ({ user }) => {
  const [rajutan, setRajutan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [cardStyle, setCardStyle] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsPerPage(8);
        setCardStyle({ width: 'calc(50% - 0.5rem)' });
        setIsMobile(true);
      } else {
        setItemsPerPage(16);
        setCardStyle({ width: 'calc(25% - 0.75rem)' });
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/rajutan/`);
        if (!res.ok) throw new Error('Gagal fetch produk');
        const data = await res.json();
        setRajutan(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(rajutan.length / itemsPerPage);
  const currentItems = rajutan.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <p className="text-center my-5">Memuat produk...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  return (
    <section style={{ backgroundColor: '#f9f9f9' }}>
      <Container className="py-4 mt-4">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: isMobile ? '0.5rem' : '1rem',
            justifyContent: 'flex-start',
          }}
        >
          {currentItems.map((item) => (
            <div
              key={item.id}
              style={{
                ...cardStyle,
                backgroundColor: '#fff',
                borderRadius: '12px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                overflow: 'hidden',
                flex: '0 0 auto',
              }}
            >
              {/* Gambar dan Icon */}
              <div
                style={{
                  width: isMobile ? '100%' : '40%',
                  padding: isMobile ? '0.4rem' : '0.5rem',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '1 / 1',
                    overflow: 'hidden',
                    borderRadius: '8px',
                  }}
                >
                  <img
                    src={item.url_gambar}
                    alt={item.nama}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.7rem',
                    marginTop: '0.4rem',
                    color: '#777',
                  }}
                >
                  <div style={{ display: 'flex', gap: '0.6rem', color: 'tomato' }}>
                    <span><BsHeart /> {item.count_like}</span>
                    <span><BsBookmark /> {item.count_favorite}</span>
                  </div>
                  <div><BsShare /></div>
                </div>
              </div>

              {/* Info dan Tombol */}
              <div
                style={{
                  width: isMobile ? '100%' : '60%',
                  padding: isMobile ? '0.4rem 0.6rem 0.5rem' : '0.6rem 0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <p style={{ fontWeight: '600', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                    {item.nama}
                  </p>
                  <p style={{ fontSize: '0.7rem', color: '#777', marginBottom: '0.2rem' }}>
                    {item.tipe || 'Rajutan'}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'green', fontWeight: 'bold' }}>
                    Rp{item.price.toLocaleString('id-ID')}
                  </p>
                </div>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="w-100 mt-1"
                  onClick={() =>
                    !user
                      ? alert('Silakan login untuk membeli.')
                      : alert(`Pesan produk: ${item.nama}`)
                  }
                  disabled={!user}
                  style={{
                    fontSize: '0.65rem',
                    padding: '0.2rem 0.4rem',
                    borderRadius: '5px',
                    lineHeight: '1.2',
                  }}
                >
                  Pesan
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <Pagination>
              {[...Array(totalPages)].map((_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={i + 1 === currentPage}
                  onClick={() => handlePageChange(i + 1)}
                  style={{ fontSize: '0.85rem' }}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Store;

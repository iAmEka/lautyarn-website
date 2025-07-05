// components/admindashboard/RajutanTable.jsx
import React from 'react';
import { Table, Image, Form, Button } from 'react-bootstrap';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom'; // ⬅️ Tambahkan ini

const RajutanTable = ({ items, onEdit, onDelete, onToggleStatus }) => {
  const navigate = useNavigate(); // ⬅️ Tambahkan ini

  return (
    <div className="table-responsive">
      <Table hover responsive borderless className="align-middle">
        <thead className="table-light small text-muted">
          <tr>
            <th style={{ width: '10%' }}>Gambar</th>
            <th>Nama</th>
            <th>Like</th>
            <th>Fav</th>
            <th>Harga</th>
            <th>Status</th>
            <th className="text-end">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <Image src={item.url_gambar} rounded fluid style={{ height: '50px', objectFit: 'cover' }} />
              </td>
              <td>
                <div className="fw-semibold">{item.nama}</div>
                <div className="text-muted small">{item.deskripsi}</div>
              </td>
              <td>{item.count_like}</td>
              <td>{item.count_favorite}</td>
              <td>Rp {item.price.toLocaleString()}</td>
              <td>
                <div className="d-flex flex-column align-items-start">
                  <span className={`badge mb-1 bg-${item.status === 'ready' ? 'success' : 'warning'}`}>
                    {item.status}
                  </span>
                  <Form.Check
                    type="switch"
                    id={`switch-${item.id}`}
                    checked={item.status === 'ready'}
                    onChange={() => onToggleStatus(item)}
                  />
                </div>
              </td>
              <td className="text-end">
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-1"
                  onClick={() => navigate(`/admin-dashboard/rajutan/edit/${item.id}`)}
                >
                  <BsPencil />
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onDelete(item.id)}
                >
                  <BsTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default RajutanTable;

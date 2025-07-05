// components/admindashboard/AdminInfoCard.jsx
import React from 'react';
import { Card } from 'react-bootstrap';

const AdminInfoCard = ({ user }) => (
  <Card>
    <Card.Body>
      <h6 className="text-muted mb-3">👑 Info Admin</h6>
      <p className="mb-1"><strong>Nama:</strong> {user?.nama || '-'}</p>
      <p className="mb-1"><strong>Telepon:</strong> {user?.nomor_telepon || '-'}</p>
      <p className="mb-0"><strong>Email:</strong> {user?.email || '-'}</p>
    </Card.Body>
  </Card>
);

export default AdminInfoCard;

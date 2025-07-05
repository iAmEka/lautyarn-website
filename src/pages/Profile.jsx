// src/pages/Profile.jsx
import React from 'react';
import { Container } from 'react-bootstrap';

const Profile = ({ user, userRole }) => {
  if (!user) {
    return <p className="text-center my-5 text-muted">Anda belum login.</p>;
  }

  return (
    <Container className="py-5 text-center">
      <h1 className="mb-4">Profil Pengguna</h1>
      <p className="lead mb-2">Nama: <strong>{user.nama}</strong></p>
      <p className="lead mb-2">Email: <span className="fw-bold">{user.email}</span></p>
      <p className="lead mb-2">Username: <code>{user.username}</code></p>
      <p className="lead mb-2">UID: <span className="text-muted">{user.uid}</span></p>
      <p className="lead mb-2">Phone Number: <code>{user.nomor_telepon}</code></p>
      <p className="lead mb-2">Alamat: <span className="text-muted">{user.alamat}</span></p>
      <p className="lead">Peran: <span className="fw-bold text-info">{userRole}</span></p>
    </Container>
  );
};

export default Profile;

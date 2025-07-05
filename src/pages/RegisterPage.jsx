// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Button, Container, Form } from 'react-bootstrap';

const API_BASE_URL = 'https://lautyarn-api-nixpacksstartcmd.up.railway.app';

const RegisterPage = () => {
  const [role, setRole] = useState('customer');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleRegister = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = {
        uid: user.uid,
        email: user.email,
        nama: user.displayName || user.email.split('@')[0],
        username: user.email.split('@')[0] + Math.floor(Math.random() * 1000),
        nomor_telepon: '0000000000',
        alamat: 'Alamat Dummy',
        role: role
      };

      const response = await fetch(`${API_BASE_URL}/users/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert(`Berhasil mendaftar sebagai ${role}. Silakan login.`);
        navigate('/login');
      } else {
        const errorData = await response.json();
        if (
          response.status === 400 &&
          errorData.detail?.toLowerCase().includes("already registered")
        ) {
          alert("Akun sudah terdaftar. Silakan login.");
          navigate('/login');
        } else {
          alert("Gagal daftar: " + (errorData.detail || "Terjadi kesalahan"));
        }
      }

    } catch (error) {
      console.error("Register error:", error);
      alert("Gagal mendaftar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <div className="card p-4 shadow mx-auto" style={{ maxWidth: 400 }}>
        <h3 className="text-center mb-4">Daftar dengan Google</h3>
        <Form.Group className="mb-3">
          <Form.Label>Pilih Peran:</Form.Label>
          <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </Form.Select>
        </Form.Group>
        <Button variant="danger" onClick={handleGoogleRegister} disabled={loading} className="w-100">
          {loading ? 'Memproses...' : 'Daftar dengan Google'}
        </Button>
      </div>
    </Container>
  );
};

export default RegisterPage;

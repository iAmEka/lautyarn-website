// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Button, Container } from 'react-bootstrap';

const API_BASE_URL = 'https://lautyarn-api-nixpacksstartcmd.up.railway.app';

const LoginPage = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Cek apakah UID terdaftar di backend
      const res = await fetch(`${API_BASE_URL}/users/by-uid/${user.uid}`);
      if (res.ok) {
        const userData = await res.json();
        alert("Login berhasil!");
        onLogin(user, userData.role); // Simpan ke state App
        navigate('/');
      } else if (res.status === 404) {
        alert("Akun belum terdaftar. Silakan daftar terlebih dahulu.");
      } else {
        throw new Error("Terjadi kesalahan saat login.");
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Gagal login: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <div className="card p-4 shadow mx-auto" style={{ maxWidth: 400 }}>
        <h3 className="text-center mb-4">Login dengan Google</h3>
        <Button variant="success" onClick={handleGoogleLogin} disabled={loading} className="w-100">
          {loading ? 'Memproses...' : 'Login dengan Google'}
        </Button>
      </div>
    </Container>
  );
};

export default LoginPage;

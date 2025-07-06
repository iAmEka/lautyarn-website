// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { auth } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Store from './pages/Store';
import About from './pages/About';
import Profile from './pages/Profile';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UpdateProfile from './pages/UpdateProfile';
import AdminDashboard from './pages/AdminDashboard';
import CreateRajutan from './pages/rajutan/CreateRajutan';
import UpdateRajutan from './pages/rajutan/UpdateRajutan';
import AdminDetailRajutan from './pages/rajutan/AdminDetailRajutan';


const API_BASE_URL = 'https://lautyarn-api-nixpacksstartcmd.up.railway.app';

function App() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState('guest');
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const res = await fetch(`${API_BASE_URL}/users/by-uid/${firebaseUser.uid}`);
          if (res.ok) {
            const data = await res.json();
            setUser(data);
            setUserRole(data.role);
            localStorage.setItem('userRole', data.role);
          } else {
            setUser(null);
            setUserRole('guest');
            localStorage.removeItem('userRole');
          }
        } catch {
          setUser(null);
          setUserRole('guest');
          localStorage.removeItem('userRole');
        }
      } else {
        setUser(null);
        setUserRole('guest');
        localStorage.removeItem('userRole');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = (userData, role) => {
    setUser(userData);
    setUserRole(role);
    localStorage.setItem('userRole', role);
  };

  const handleLogout = () => {
    setUser(null);
    setUserRole('guest');
    localStorage.removeItem('userRole');
  };

  const hideNavbarRoutes = ['/profile', '/update-profile', '/admin-dashboard/rajutan/detail'];
  const shouldShowNavbar = !hideNavbarRoutes.some((route) =>
    location.pathname.startsWith(route)
  );
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <p className="text-muted">Memuat aplikasi...</p>
      </div>
    );
  }

  return (
    <>
      {shouldShowNavbar && (
        <Navbar user={user} userRole={userRole} onLogout={handleLogout} />
      )}

      <Routes>
        <Route path="/" element={<Home user={user} userRole={userRole} />} />
        <Route path="/store" element={<Store user={user} userRole={userRole} />} />
        <Route path="/admin-dashboard/rajutan/edit/:id" element={<UpdateRajutan />} />
        <Route path="/about" element={<About />} />

        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/admin-dashboard/rajutan/detail/:id" element={<AdminDetailRajutan />} />

        <Route path="/register" element={<RegisterPage />} />
        <Route
            path="/rajutan/create"
            element={
              <ProtectedRoute user={user} userRole={userRole} requiredRole="admin">
                <CreateRajutan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard/create"
            element={
              <ProtectedRoute user={user} userRole={userRole} requiredRole="admin">
                <CreateRajutan />
              </ProtectedRoute>
            }
          />

        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user}>
              <Profile user={user} userRole={userRole} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/update-profile"
          element={
            <ProtectedRoute user={user}>
              <UpdateProfile user={user} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute user={user} userRole={userRole} requiredRole="admin">
              <AdminDashboard user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

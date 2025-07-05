// components/admindashboard/SidebarMenu.jsx
import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const SidebarMenu = ({ activeView, setActiveView }) => {
  const menus = [
    { key: 'rajutan', label: '🧵 Rajutan' },
    { key: 'customer', label: '👥 Customer' },
    { key: 'pesanan', label: '📦 Pesanan' },
    { key: 'admin', label: '👮 Admin' },
    { key: 'tipe', label: '🛠️ Tipe Rajutan' },
  ];

  return (
    <Card className="mb-3">
      <Card.Body>
        <h6 className="text-muted mb-3">📂 Daftar Lainnya</h6>
        <ListGroup variant="flush">
          {menus.map((menu) => (
            <ListGroup.Item
              key={menu.key}
              action
              active={activeView === menu.key}
              onClick={() => setActiveView(menu.key)}
            >
              {menu.label}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default SidebarMenu;

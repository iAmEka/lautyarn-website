// src/components/admindashboard/SidebarMenu.jsx
import React from 'react';
import { ListGroup } from 'react-bootstrap';

const SidebarMenu = ({ activeView, setActiveView }) => {
  const menus = [
    { key: 'rajutan', label: '🧵 Rajutan' },
    { key: 'customer', label: '👥 Customer' },
    { key: 'pesanan', label: '📦 Pesanan' },
    { key: 'admin', label: '👮 Admin' },
    { key: 'type_rajutan', label: '🛠️ Tipe Rajutan' },
  ];

  return (
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
  );
};

export default SidebarMenu;

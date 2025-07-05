// components/admindashboard/RajutanModal.jsx
import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const RajutanModal = ({ show, onHide, onSave, editMode, currentRajutan, setCurrentRajutan }) => (
  <Modal show={show} onHide={onHide} centered>
    <Modal.Header closeButton>
      <Modal.Title>{editMode ? 'Edit Rajutan' : 'Tambah Rajutan'}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Nama Rajutan</Form.Label>
          <Form.Control
            type="text"
            value={currentRajutan.nama}
            onChange={(e) => setCurrentRajutan({ ...currentRajutan, nama: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Deskripsi</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={currentRajutan.deskripsi}
            onChange={(e) => setCurrentRajutan({ ...currentRajutan, deskripsi: e.target.value })}
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>Batal</Button>
      <Button variant="primary" onClick={onSave}>Simpan</Button>
    </Modal.Footer>
  </Modal>
);

export default RajutanModal;

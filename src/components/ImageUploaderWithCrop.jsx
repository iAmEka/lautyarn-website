// src/components/ImageUploaderWithCrop.jsx
import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Button, Modal } from 'react-bootstrap';
import getCroppedImg from './getCroppedImg';
import axios from 'axios';
import '../styles/ghibli-crop.css'; // Tambahkan file CSS khusus Ghibli crop

const CLOUD_NAME = 'dlsjvw9gb';
const UPLOAD_PRESET = 'unsigned_rajutan';

const ImageUploaderWithCrop = ({ setImageUrl }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);

  const onSelectFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setShowModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const uploadImage = async () => {
    try {
      setUploading(true);
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      const formData = new FormData();
      formData.append('file', croppedBlob);
      formData.append('upload_preset', UPLOAD_PRESET);
      formData.append('folder', 'rajutan');

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );

      setImageUrl(response.data.secure_url);
      setShowModal(false);
    } catch (err) {
      alert('❌ Upload gagal');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-3 ghibli-crop-container">
      <label className="form-label ghibli-label">Pilih Gambar</label>
      <input type="file" accept="image/*" onChange={onSelectFile} className="form-control ghibli-input" />
      
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton className="ghibli-modal-header">
          <Modal.Title className="ghibli-modal-title">Crop Gambar</Modal.Title>
        </Modal.Header>
        <Modal.Body className="ghibli-modal-body">
          <div style={{ position: 'relative', width: '100%', height: 400, background: '#f9f9f9' }}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              restrictPosition={true}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              showGrid={false}
              cropShape="rect"
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="ghibli-modal-footer">
          <Button variant="secondary" onClick={() => setShowModal(false)} className="ghibli-button">
            Batal
          </Button>
          <Button variant="primary" onClick={uploadImage} disabled={uploading} className="ghibli-button">
            {uploading ? 'Mengunggah...' : 'Simpan & Upload'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ImageUploaderWithCrop;

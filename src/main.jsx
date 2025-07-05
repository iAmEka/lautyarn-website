// lautyarn-website/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { BrowserRouter } from 'react-router-dom'; // <--- PASTIKAN INI DIIMPOR

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* INI ADALAH TEMPAT UNTUK <BrowserRouter> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
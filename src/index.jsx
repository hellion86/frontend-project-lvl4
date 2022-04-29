import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/scss/bootstrap.scss';

const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

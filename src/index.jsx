import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';

const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
 
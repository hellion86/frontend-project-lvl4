// import React from 'react';
import regeneratorRuntime, { async } from 'regenerator-runtime';
import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// import App from './components/App.jsx';
// import store from './slices/index.js';
// import './locales/index.js';
import init from './init.jsx';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/scss/bootstrap.scss';

// const root = ReactDOM.createRoot(document.getElementById('chat'));
// root.render(
//   // <React.StrictMode>
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   // </React.StrictMode>,
// );

const runApp = async () => {
  const app = await init();
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(app);
};

runApp();

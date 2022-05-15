/* eslint-disable no-unused-vars */
import regeneratorRuntime, { async } from 'regenerator-runtime';
import ReactDOM from 'react-dom/client';
import init from './init.jsx';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/scss/bootstrap.scss';

const runApp = async () => {
  const app = await init();
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(app);
};

runApp();

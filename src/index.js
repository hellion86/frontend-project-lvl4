/* eslint-disable no-unused-vars */
import regeneratorRuntime, { async } from 'regenerator-runtime';
import ReactDOM from 'react-dom/client';
import io from 'socket.io-client';
import init from './init.jsx';
import '../assets/application.scss';

const runApp = async () => {
  const socket = io();
  const app = await init(socket);
  ReactDOM.createRoot(document.getElementById('chat')).render(app);
};

runApp();

export default runApp;

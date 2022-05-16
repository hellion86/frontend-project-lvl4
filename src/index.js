/* eslint-disable no-unused-vars */
import regeneratorRuntime, { async } from 'regenerator-runtime';
import ReactDOM from 'react-dom/client';
import io from 'socket.io-client';
import init from './init.jsx';
import '../assets/application.scss';

const socket = io();

const runApp = async (s) => {
  console.log(s)
  const app = await init(s);
  // console.log(app);
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(app);
};

runApp(socket);

export default runApp;

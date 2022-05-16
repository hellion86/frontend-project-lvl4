/* eslint-disable no-unused-vars */
import regeneratorRuntime, { async } from 'regenerator-runtime';
import ReactDOM from 'react-dom/client';
import io from 'socket.io-client';
import init from './init.jsx';
import '../assets/application.scss';

const runApp = async (s) => {
  // console.log(s);
  const app = await init(s);
  // console.log(app);
  // const dom = document.getElementById('chat');
  // console.log(dom);
  ReactDOM.createRoot(document.getElementById('chat')).render(app);
};

const socket = io();
runApp(socket);

export default runApp;

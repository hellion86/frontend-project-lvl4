/* eslint-disable no-unused-vars */
import regeneratorRuntime, { async } from 'regenerator-runtime';
import ReactDOM from 'react-dom/client';
import io from 'socket.io-client';
import * as filter from 'leo-profanity';
import init from './init.jsx';
import '../assets/application.scss';

const runApp = async () => {
  // eslint-disable-next-line no-undef
  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    environment: 'production',
  };

  filter.add(filter.getDictionary('ru'));

  const socket = io();
  const app = await init(socket, rollbarConfig);
  ReactDOM.createRoot(document.getElementById('chat')).render(app);
};

runApp();

export default runApp;

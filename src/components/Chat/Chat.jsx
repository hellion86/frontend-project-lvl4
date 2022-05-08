/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import io from 'socket.io-client';
import routes from '../../routes.js';
import Channels from './Channels.jsx';
import SendForm from './SendForm.jsx';
import Messages from './Messages.jsx';
import CurrentChannel from './CurrentChannel.jsx';

import {
  selectors as channelsSelector,
  actions as channelsAction,
} from '../../slices/channelsSlice.js';
import {
  selectors as messageSelector,
  actions as messagesAction,
} from '../../slices/messagesSlice.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

const Chat = () => {
  const dispatch = useDispatch();
  const { username } = JSON.parse(localStorage.getItem('userId'));
  const [currentChannel, setCurrentChannel] = useState({
    id: 1,
    name: 'general',
  });
  const socket = io();
  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(routes.getData(), {
        headers: getAuthHeader(),
      });
      dispatch(channelsAction.addChannels(data.channels));
      dispatch(messagesAction.addMessages(data.messages));
    };
    fetch();
  }, []);

  const channelsList = useSelector(channelsSelector.selectAll);
  const messagesList = useSelector(messageSelector.selectAll);
  const messageNumber = messagesList.filter(
    (message) => message.channelId === currentChannel.id
  );

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels
          channelsList={channelsList}
          currentChannel={currentChannel}
          setCurrentChannel={setCurrentChannel}
          socket={socket}
        />
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <CurrentChannel
              currentChannelName={currentChannel.name}
              messageNumber={messageNumber.length}
            />
            <Messages
              messagesList={messagesList}
              currentChannelId={currentChannel.id}
            />
            <SendForm
              socket={socket}
              username={username}
              messagesAction={messagesAction}
              currentChannelId={currentChannel.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

/* eslint-disable */
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import io from 'socket.io-client';
import routes from '../../routes.js';
import Channels from './Channels.jsx';
import SendForm from './SendForm.jsx';
import Messages from './Messages.jsx';

import { selectors as channelsSelector } from '../../slices/channelsSlice.js';
import { selectors as messageSelector } from '../../slices/messagesSlice.js';

import { actions as channelsAction } from '../../slices/channelsSlice.js';
import { actions as messagesAction } from '../../slices/messagesSlice.js';
import CurrentChannel from './CurrentChannel.jsx';

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
  const [currentChannelId, setCurrentChannelId] = useState('');
  const [currentChannelName, setCurrentChannelName] = useState('');
  const socket = io();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(routes.getData(), {
        headers: getAuthHeader(),
      });
      console.log(data);
      setCurrentChannelId(data.currentChannelId);
      const [currentChannelName] = data.channels.filter(
        (channel) => channel.id === data.currentChannelId
      );
      setCurrentChannelName(currentChannelName.name);
      dispatch(channelsAction.addChannels(data.channels));
    };
    fetch();
  
  }, []);

  const channelsList = useSelector(channelsSelector.selectAll);
  const messagesList = useSelector(messageSelector.selectAll);
  //console.log(setCurrentChannelId)
 
  const addChannel = () => {
    socket.emit('newChannel', ['test'])
    socket.on('newChannel', (msg) => {
      console.log(msg)
    })
  }
 

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>Каналы</span>
            <button
              type="button"
              className="p-0 text-primary btn btn-group-vertical"
              onClick={addChannel}
            >
              <span>+</span>
            </button>
          </div>
          <Channels
            channelsList={channelsList}
            currentChannel={currentChannelId}
          />
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <CurrentChannel currentChannelName={currentChannelName} />
            <Messages messagesList={messagesList} />
            <SendForm
              socket={socket}
              username={username}
              messagesAction={messagesAction}
              currentChannelId={currentChannelId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

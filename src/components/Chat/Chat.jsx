/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import useAuth from '../../hooks/index.jsx';
import routes from '../../routes.js';
import io from 'socket.io-client';
import { fetchChannels } from '../../slices/channelsSlice.js';
import { socketInit } from '../socket.js';
import ErrorModal from '../Modals/ErrorModal.jsx';
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

// const getAuthHeader = () => {
//   const userId = JSON.parse(localStorage.getItem('userId'));
//   if (userId && userId.token) {
//     return { Authorization: `Bearer ${userId.token}` };
//   }
//   return {};
// };

const socket = io();


const Chat = () => {
  const dispatch = useDispatch();
  const { username } = JSON.parse(localStorage.getItem('userId'));
  // const [currentChannel, setCurrentChannel] = useState({});
  const [showError, setShowError] = useState(false);
  const handleClose = () => setShowError(false);
  socketInit(dispatch, socket);

  const channelsList = useSelector((state) => state.channelsReducer.channels);
  // console.log(channelsList)
  const currentChannel = useSelector((state) => state.channelsReducer.currentChannel);
  const messagesList = useSelector(messageSelector.selectAll);
  const messageNumber = messagesList.filter((message) => message.channelId === currentChannel.id).length;
  //const auth = useAuth();
  //const socket = auth.socket;
 
  useEffect(() => {
    console.log('useeffect do')
    dispatch(fetchChannels());
    // const fetch = async () => {
    //   try {
    //     const { data } = await axios.get(routes.getData(), {
    //       headers: getAuthHeader(),
    //     });
    //     // dispatch(channelsAction.addChannels(data.channels));
    //     dispatch(channelsAction.setCurrentChannel({id: 1, name: 'general' }))
    //     dispatch(messagesAction.addMessages(data.messages));
    //     setShowError(false)
    //     //setCurrentChannel({id: data.currentChannelId, name: 'general'})
    //   } catch (errors) {
    //     setShowError(true)
    //   }
    // };
    // fetch();
  }, [dispatch]);

  const renderModal = (show) => {
    if (!show) {
      return null;
    }
    return (
      <ErrorModal
        handleClose={handleClose}
        show={show}
      />
    );
  };

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels
          channelsList={channelsList}
          currentChannel={currentChannel}
          // setCurrentChannel={setCurrentChannel}
          socket={socket}
          />
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <CurrentChannel
              currentChannel={currentChannel}
              messageNumber={messageNumber}
            
            />
            <Messages
              messagesList={messagesList}
              currentChannel={currentChannel}
            />
            <SendForm
              socket={socket}
              username={username}
              currentChannel={currentChannel}
            />
          </div>
        </div>
      </div>
      {renderModal(showError)}
    </div>
  );
};

export default Chat;

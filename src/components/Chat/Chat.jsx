/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChannels } from '../../slices/channelsSlice.js';
import { fetchMessages } from '../../slices/messagesSlice.js';
import ErrorModal from '../Modals/ErrorModal.jsx';
import Channels from './Channels.jsx';
import SendForm from './SendForm.jsx';
import Messages from './Messages.jsx';
import CurrentChannel from './CurrentChannel.jsx';
import { actions as channelsAction } from '../../slices/channelsSlice.js';



const Chat = () => {
  const dispatch = useDispatch();
  const { username } = JSON.parse(localStorage.getItem('userId'));
  const [showError, setShowError] = useState(false);
  const handleClose = () => setShowError(false);
  
  const channelsList = useSelector((state) => state.channelsReducer.channels);
  // console.log(channelsList)
  const currentChannel = useSelector((state) => state.channelsReducer.currentChannel);
  const messages = useSelector((state) => state.messagesReducer.messages);
  // console.log(messages)
  const messageNumber = messages.filter((message) => message.channelId === currentChannel.id).length;
  const status = useSelector((state) => state.channelsReducer.status);
  console.log(status)
  
  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages());
    dispatch(channelsAction.setCurrentChannel({id: 1, name: 'general' }))
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
          />
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <CurrentChannel
              currentChannel={currentChannel}
              messageNumber={messageNumber}
            />
            <Messages
              messagesList={messages}
              currentChannel={currentChannel}
            />
            <SendForm
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

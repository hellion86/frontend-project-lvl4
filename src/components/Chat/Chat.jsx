/* eslint-disable */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChannels } from '../../slices/channelsSlice.js';
import { fetchMessages } from '../../slices/messagesSlice.js';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import Channels from './Channels.jsx';
import SendForm from './SendForm.jsx';
import Messages from './Messages.jsx';
import CurrentChannel from './CurrentChannel.jsx';
import { actions as channelsAction } from '../../slices/channelsSlice.js';

const Chat = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { username } = JSON.parse(localStorage.getItem('userId'));
  const { status, channelsError, currentChannel, channels } = useSelector(
    (state) => state.channelsReducer
  );
  const { messages, messageError } = useSelector(
    (state) => state.messagesReducer
  );
  const messageNumber = messages.filter(
    (message) => message.channelId === currentChannel.id
  ).length;
  const notify = () => toast.error(t('appErrors.modal.failFetch'));

  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages());
    dispatch(channelsAction.setCurrentChannel({ id: 1, name: 'general' }));
  }, [dispatch]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      {channelsError || messageError ? notify() : null}
      <div className="row h-100 bg-white flex-md-row">
        <Channels channelsList={channels} currentChannel={currentChannel} />
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <CurrentChannel
              currentChannel={currentChannel}
              messageNumber={messageNumber}
            />
            <Messages messagesList={messages} currentChannel={currentChannel} />
            <SendForm username={username} currentChannel={currentChannel} />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Chat;

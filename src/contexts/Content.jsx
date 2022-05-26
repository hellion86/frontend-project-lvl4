/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/function-component-definition */
import React, { createContext } from 'react';
import { useDispatch } from 'react-redux';
import { actions as channelsAction } from '../slices/channelsSlice.js';
import { actions as messagesAction } from '../slices/messagesSlice.js';

export const ContentContext = createContext({});

const ContentProvider = ({ children, socket }) => {
  const dispatch = useDispatch();

  socket.on('newMessage', (msg) => {
    dispatch(messagesAction.addMessage(msg));
  });

  socket.on('newChannel', (msg) => {
    dispatch(channelsAction.addChannel(msg));
  });

  socket.on('renameChannel', (msg) => {
    const newNameOfChannel = { id: msg.id, newName: msg.name };
    dispatch(channelsAction.renameChannel(newNameOfChannel));
  });

  socket.on('removeChannel', (msg) => {
    dispatch(channelsAction.removeChannel(msg.id));
  });

  const addChannel = (name) => {
    socket.emit('newChannel', { name }, (resp) => {
      const { data } = resp;
      if (resp.status === 'ok') {
        dispatch(channelsAction.setCurrentChannel({ id: data.id, name: data.name }));
      }
    });
  };

  const renameChannel = (id, name) => socket.emit('renameChannel', { id, name });

  const removeChannel = (id) => socket.emit('removeChannel', { id });

  const newMessage = (textMessage, author, channelId, cb) => {
    socket.emit('newMessage', { textMessage, author, channelId }, (resp) => {
      if (resp.status !== 'ok') {
        cb(true);
      } else {
        cb(false);
      }
    });
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ContentContext.Provider
      value={{
        socket,
        removeChannel,
        newMessage,
        renameChannel,
        addChannel,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export default ContentProvider;

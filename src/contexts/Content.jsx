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

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ContentContext.Provider value={{ socket }}>
      {children}
    </ContentContext.Provider>
  );
};

export default ContentProvider;

/* eslint-disable import/prefer-default-export */
// import io from 'socket.io-client';
import { actions as channelsAction } from '../slices/channelsSlice.js';
import { actions as messagesAction } from '../slices/messagesSlice.js';

export const socketInit = (dispatch, socket) => {
  socket.on('newMessage', (msg) => {
    dispatch(messagesAction.addMessage(msg));
  });

  socket.on('newChannel', (msg) => {
    console.log('i am work!')
    dispatch(channelsAction.addChannel(msg));
  });

  socket.on('renameChannel', (msg) => {
    const newNameOfChannel = { id: msg.id, newName: msg.name };
    dispatch(channelsAction.renameChannel(newNameOfChannel));
  });

  socket.on('removeChannel', (msg) => {
    console.log('remove socket work')
    dispatch(channelsAction.removeChannel(msg.id));
  });
};

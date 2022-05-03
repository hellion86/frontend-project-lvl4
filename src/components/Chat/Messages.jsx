/* eslint-disable react/function-component-definition */
import React from 'react';
import { useSelector } from 'react-redux';
import { selectors as messageSelector } from '../../slices/messagesSlice.js';

const Messages = () => {
  const messagesList = useSelector(messageSelector.selectAll);
  console.log(messagesList);
  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {messagesList.map((message) => (
        <div className="text-break mb-2" key={message.id}>
          <b>{message.username}</b>:{' '}{message.textMessage}
        </div>
      ))}
    </div>
  );
};

export default Messages;

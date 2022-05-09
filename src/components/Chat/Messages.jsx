/* eslint-disable react/function-component-definition */
import React from 'react';

const Messages = ({ messagesList, currentChannelId }) => {
  const currentMessages = messagesList.filter((message) => message.channelId === currentChannelId);
  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {currentMessages.map((message) => (
        <div className="text-break mb-2" key={message.id}>
          <b>{message.author}</b>
          :
          {' '}
          {message.textMessage}
        </div>
      ))}
    </div>
  );
};

export default Messages;

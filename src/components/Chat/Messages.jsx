/* eslint-disable react/function-component-definition */
import React, { useEffect, useRef } from 'react';

const Messages = ({ messagesList, currentChannel }) => {
  const currentMessages = messagesList.filter((message) => message.channelId === currentChannel.id);
  const messRef = useRef(null);
  useEffect(() => {
    messRef.current.scrollTop = messRef.current.scrollHeight;
  });
  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5" ref={messRef}>
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

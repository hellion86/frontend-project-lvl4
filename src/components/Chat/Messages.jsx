/* eslint-disable react/function-component-definition */
import React from 'react';

const Messages = (props) => {
  const { messagesList } = props;

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {messagesList.map((message) => (
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

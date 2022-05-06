import React from 'react';
import { Badge } from 'react-bootstrap';

const CurrentChannel = ({ currentChannelName, messageNumber }) => {
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b># {currentChannelName}</b>
      </p>
      <Badge bg="secondary">{messageNumber} сообщений</Badge>{' '}
    </div>
  );
};

export default CurrentChannel;

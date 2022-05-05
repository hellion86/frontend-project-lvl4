import React from 'react';

const CurrentChannel = ({ currentChannelName }) => {
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>#{currentChannelName}</b>
      </p>
    </div>
  );
};

export default CurrentChannel;

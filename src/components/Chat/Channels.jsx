/* eslint-disable react/function-component-definition */
import React from 'react';

const Channels = ({ channelsList, currentChannel, setCurrentChannelId, setCurrentChannelName }) => {
  //console.log(props);
  const channelActive = {
    active: 'w-100 rounded-0 text-start btn btn-secondary',
    none: 'w-100 rounded-0 text-start btn',
  };
  const toggleChannel = (e) => {
    const activeChannelName = e.target.outerText.split('#')[1];
    const [activeChannel] = channelsList.filter((channel) => channel.name === activeChannelName);
    setCurrentChannelId(activeChannel.id);
    setCurrentChannelName(activeChannelName);
  };

  return (
    <ul className="nav flex-column nav-pills nav-fill px-2">
      {channelsList.map((channel) => (
        <li key={channel.id} className="nav-item w-100">
          <button
            type="button"
            className={
              channel.id === currentChannel
                ? channelActive.active
                : channelActive.none
            }
            onClick={toggleChannel}
          >
            <span className="me-1">#</span>
            {channel.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Channels;

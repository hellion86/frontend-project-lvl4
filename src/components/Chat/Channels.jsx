/* eslint-disable react/function-component-definition */
import React from 'react';
import { useSelector } from 'react-redux';
import { selectors as channelsSelector } from '../../slices/channelsSlice.js';

const Channels = () => {
  const channelsList = useSelector(channelsSelector.selectAll);

  return (
    <ul className="nav flex-column nav-pills nav-fill px-2">
      {channelsList.map((channel) => (
        <li key={channel.id} className="nav-item w-100">
          <button
            type="button"
            className="w-100 rounded-0 text-start btn btn-secondary"
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

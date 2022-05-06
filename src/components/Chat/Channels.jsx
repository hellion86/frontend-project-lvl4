/* eslint-disable react/function-component-definition */
import React from 'react';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';

const Channels = ({
  channelsList,
  currentChannel,
  setCurrentChannelId,
  setCurrentChannelName,
}) => {
  console.log(channelsList);
  const active = (id) => (id === currentChannel ? 'secondary' : '');
  const toggleChannel = (e) => {
    const activeChannelName = e.target.outerText.split('#')[1];
    const [activeChannel] = channelsList.filter(
      (channel) => channel.name === activeChannelName
    );
    setCurrentChannelId(activeChannel.id);
    setCurrentChannelName(activeChannelName);
  };

  return (
    <ul className="nav flex-column nav-pills nav-fill px-2">
      {channelsList.map((channel) => (
        <li key={channel.id} className="nav-item w-100">
          <Dropdown as={ButtonGroup} className="d-flex">
            <Button
              variant={active(channel.id)}
              className="w-100 rounded-0 text-start text-truncate"
              onClick={toggleChannel}
            >
              <span className="me-1">#</span>
              {channel.name}
            </Button>
            {!channel.removable ? (
              ''
            ) : (
              <>
                <Dropdown.Toggle
                  split
                  variant={active(channel.id)}
                  id="dropdown-split-basic"
                />
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Удалить</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Переименовать</Dropdown.Item>
                </Dropdown.Menu>
              </>
            )}
          </Dropdown>
        </li>
      ))}
    </ul>
  );
};

export default Channels;

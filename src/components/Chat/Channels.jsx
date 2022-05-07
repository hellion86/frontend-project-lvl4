/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import ChannelsModal from '../Modals/ChannelsModal.jsx';

const Channels = ({
  channelsList,
  currentChannel,
  setCurrentChannelId,
  setCurrentChannelName,
}) => {
  const [showRemove, setShowRemove] = useState(false);
  const [showRename, setShowRename] = useState(false);
  const handleCloseRemove = () => setShowRemove(false);
  const handleShowRemove = () => setShowRemove(true);
  const handleCloseRename = () => setShowRename(false);
  const handleShowRename = () => setShowRename(true);

  // console.log(channelsList);
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
    <>
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
                    <Dropdown.Item onClick={handleShowRemove}>
                      Удалить
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleShowRename}>
                      Переименовать
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </>
              )}
            </Dropdown>
          </li>
        ))}
      </ul>
      <ChannelsModal
        show={showRemove}
        handleClose={handleCloseRemove}
        type="remove"
      />
      <ChannelsModal
        show={showRename}
        handleClose={handleCloseRename}
        type="rename"
      />
    </>
  );
};

export default Channels;

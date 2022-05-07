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
  const [modal, setModal] = useState({ show: false, id: '', type: '' });
  const handleShow = (id, type) => {
    setModal({ show: true, id, type });
  };
  const handleClose = () => setModal({ show: false, id: '', type: '' });
  const active = (id) => (id === currentChannel ? 'secondary' : '');
  const toggleChannel = (id, name) => {
    setCurrentChannelId(id);
    setCurrentChannelName(name);
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
                onClick={() => toggleChannel(channel.id, channel.name)}
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
                    <Dropdown.Item
                      onClick={() => handleShow(channel.id, 'remove')}
                    >
                      Удалить
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleShow(channel.id, 'rename')}
                    >
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
        handleClose={handleClose}
        show={modal.show}
        type={modal.type}
        channelId={modal.id}
      />
    </>
  );
};

export default Channels;

/* eslint-disable object-curly-newline */
/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import ChannelsModal from '../Modals/ChannelsModal.jsx';

const Channels = ({
  channelsList,
  currentChannel,
  setCurrentChannel,
  socket,
}) => {
  const [modal, setModal] = useState({ show: false, id: '', type: '', channelName: '' });
  const handleShow = (id, type, name) => setModal({ show: true, id, type, channelName: name });
  const handleClose = () => setModal({ show: false, id: '', type: '', channelName: '' });
  const active = (id) => (id === currentChannel.id ? 'secondary' : '');
  const toggleChannel = (id, name) => setCurrentChannel({ id, name });

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>Каналы</span>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={() => handleShow('', 'add', '')}
        >
          <span>
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.08281 4.1257C9.20349 2.91896 10.2189 2 11.4317 2H12.569C13.7819 2 14.7973 2.9191 14.9179 4.12577C14.9466 4.41213 15.2825 4.55104 15.5049 4.36904C16.4435 3.60111 17.8113 3.66933 18.6688 4.52684L19.4731 5.33114C20.3306 6.18869 20.3988 7.55654 19.6309 8.49516C19.4488 8.71774 19.5878 9.0537 19.8742 9.08234C21.0809 9.20301 22 10.2185 22 11.4313V12.5687C22 13.7814 21.0811 14.7968 19.8744 14.9175C19.5883 14.9461 19.4491 15.2818 19.6313 15.5045C20.3992 16.4431 20.3311 17.811 19.4735 18.6686L18.6693 19.4728C17.8117 20.3304 16.4439 20.3986 15.5052 19.6306C15.2827 19.4485 14.9466 19.5875 14.918 19.874C14.7973 21.0808 13.7818 22 12.5689 22H11.4319C10.219 22 9.20348 21.081 9.08279 19.8741C9.05417 19.5879 8.71814 19.4485 8.49522 19.6309C7.55652 20.3989 6.18845 20.3308 5.33075 19.4731L4.52683 18.6692C3.66918 17.8115 3.60104 16.4435 4.36904 15.5049C4.55134 15.2821 4.41205 14.9461 4.12581 14.9175C2.91901 14.7968 2 13.7813 2 12.5685V11.4315C2 10.2185 2.91917 9.203 4.12601 9.08232C4.41256 9.05366 4.55164 8.71751 4.36945 8.49484C3.60142 7.55614 3.66965 6.18819 4.52727 5.33057L5.33129 4.52654C6.18895 3.66889 7.55693 3.60082 8.49555 4.36878C8.71838 4.5511 9.05421 4.41172 9.08281 4.1257ZM11.4317 4C11.2464 4 11.0913 4.14037 11.0729 4.3247C10.8855 6.1989 8.68649 7.10913 7.22907 5.9167C7.08558 5.79929 6.87649 5.80977 6.74551 5.94076L5.94148 6.74478C5.81042 6.87585 5.79999 7.08491 5.91736 7.22836C7.11014 8.6862 6.19901 10.885 4.32502 11.0724C4.14049 11.0908 4 11.2461 4 11.4315V12.5685C4 12.7538 4.14042 12.909 4.32482 12.9274C6.199 13.1148 7.10952 15.3138 5.91695 16.7714C5.79955 16.9148 5.81001 17.1239 5.94104 17.255L6.74496 18.0589C6.87602 18.1899 7.08519 18.2004 7.22874 18.083C8.68633 16.8904 10.8854 17.8008 11.0729 19.6751C11.0913 19.8595 11.2465 20 11.4319 20H12.5689C12.7541 20 12.9094 19.8595 12.9279 19.675C13.1153 17.8012 15.3139 16.8899 16.7717 18.0827C16.9151 18.2 17.1241 18.1896 17.2551 18.0586L18.0593 17.2544C18.1903 17.1234 18.2007 16.9144 18.0834 16.771C16.8909 15.3136 17.8013 13.1148 19.6754 12.9274C19.8597 12.909 20 12.7539 20 12.5687V11.4313C20 11.246 19.8596 11.0909 19.6752 11.0724C17.8013 10.885 16.8903 8.68639 18.083 7.22869C18.2003 7.0853 18.1899 6.87635 18.0589 6.74535L17.2546 5.94105C17.1236 5.8101 16.9147 5.79968 16.7714 5.91696C15.3137 7.10961 13.1152 6.19848 12.9279 4.32478C12.9094 4.14038 12.7542 4 12.569 4H11.4317Z"
                fill="#152C70"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10ZM8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12Z"
                fill="#4296FF"
              />
            </svg>
          </span>
        </button>
      </div>
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
                      onClick={() => handleShow(channel.id, 'remove', channel.name)}
                    >
                      Удалить
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleShow(channel.id, 'rename', channel.name)}
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
        setCurrentChannel={setCurrentChannel}
        show={modal.show}
        type={modal.type}
        channelId={modal.id}
        channelName={modal.channelName}
        channelsList={channelsList}
        socket={socket}
      />
    </div>
  );
};

export default Channels;

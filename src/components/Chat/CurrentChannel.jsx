/* eslint-disable react/function-component-definition */
import React from 'react';
import { Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const CurrentChannel = ({ currentChannel, messageNumber }) => {
  const { t } = useTranslation();
  const selectCurrentChannel = useSelector((state) => {
    const channelsList = useSelector((state) => state.channelsReducer.channels);
    const [getChannel] = channelsList.filter((c) => c.id === currentChannel);
    return getChannel;
  });
  const currentName = selectCurrentChannel ? selectCurrentChannel.name : null;

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          #
          {' '}
          {currentName}
        </b>
      </p>
      <Badge bg="secondary">
        {t('chatHeader.counter.count', { count: messageNumber })}
      </Badge>
    </div>
  );
};
export default CurrentChannel;

/* eslint-disable react/function-component-definition */
import React from 'react';
import { Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const CurrentChannel = ({ currentChannel, messageNumber }) => {
  const { t } = useTranslation();
  const name = currentChannel ? currentChannel.name : null;

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          #
          {' '}
          { name }
        </b>
      </p>
      <Badge bg="secondary">
        {t('chatHeader.counter.count', { count: messageNumber })}
      </Badge>
    </div>
  );
};
export default CurrentChannel;

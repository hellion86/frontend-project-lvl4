/* eslint-disable react/function-component-definition */
import React from 'react';
import { Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const CurrentChannel = ({ currentChannelName, messageNumber }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          #
          {currentChannelName}
        </b>
      </p>
      <Badge bg="secondary">
        {t('chatHeader.counter.count', { count: messageNumber })}
      </Badge>
    </div>
  );
};
export default CurrentChannel;

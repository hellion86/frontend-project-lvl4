/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import * as filter from 'leo-profanity';

import useCon from '../../hooks/useContent.jsx';

const SendForm = ({
  username, currentChannel,
}) => {
  filter.add(filter.getDictionary('ru'));
  const { t } = useTranslation();
  const [messageSent, setMesssageSent] = useState(false);
  const content = useCon();

  return (
    <div className="mt-auto px-5 py-3">
      <Formik
        initialValues={{ textMessage: '' }}
        onSubmit={(values, actions) => {
          const text = filter.clean(values.textMessage);
          content.socket.emit(
            'newMessage',
            { textMessage: text, author: username, channelId: currentChannel.id },
            (response) => {
              if (response.status !== 'ok') {
                setMesssageSent(true);
              } else {
                setMesssageSent(false);
                actions.resetForm({ values: '' });
              }
            },
          );
        }}
      >
        {({ values }) => (
          <Form className="py-1 border rounded-2">
            <div className="input-group has-validation">
              <Field
                name="textMessage"
                type="text"
                className="border-0 p-1 ps-3 m-1 form-control"
              />
              <button
                type="submit"
                className="btn p-1 rounded-2"
                disabled={values.textMessage.length <= 0}
              >
                <svg
                  width="28px"
                  height="28px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7 2.5C4.23858 2.5 2 4.73858 2 7.5V13.5C2 16.2614 4.23858 18.5 7 18.5H8.58579L11.2929 21.2071C11.6834 21.5976 12.3166 21.5976 12.7071 21.2071L15.4142 18.5H17C19.7614 18.5 22 16.2614 22 13.5V7.5C22 4.73858 19.7614 2.5 17 2.5H7ZM4 7.5C4 5.84315 5.34315 4.5 7 4.5H17C18.6569 4.5 20 5.84315 20 7.5V13.5C20 15.1569 18.6569 16.5 17 16.5H7C5.34315 16.5 4 15.1569 4 13.5V7.5Z"
                    fill="#152C70"
                  />
                  <path
                    d="M7 7.5C6.44772 7.5 6 7.94772 6 8.5C6 9.05228 6.44772 9.5 7 9.5H15C15.5523 9.5 16 9.05228 16 8.5C16 7.94772 15.5523 7.5 15 7.5H7Z"
                    fill="#4296FF"
                  />
                  <path
                    d="M6 12.5C6 11.9477 6.44772 11.5 7 11.5H17C17.5523 11.5 18 11.9477 18 12.5C18 13.0523 17.5523 13.5 17 13.5H7C6.44772 13.5 6 13.0523 6 12.5Z"
                    fill="#4296FF"
                  />
                </svg>
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {messageSent ? (
        <div className="danger">{t('chatMessages.errors.sendError')}</div>
      ) : null}
    </div>
  );
};

export default SendForm;

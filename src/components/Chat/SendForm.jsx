/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { SendButton } from './ChatButtons/SendButton.jsx';

// import { actions as messagesAction } from '../../slices/messagesSlice.js';

const SendForm = ({ messagesAction, username, socket, currentChannelId }) => {
  const dispatch = useDispatch();
  const [messageSent, setMesssageSent] = useState(false);
  socket.on('newMessage', (msg) => {
    dispatch(messagesAction.addMessage(msg));
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Formik
        initialValues={{ textMessage: '' }}
        onSubmit={(values, actions) => {
          socket.emit(
            'newMessage',
            { ...values, author: username, channelId: currentChannelId },
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
              {/* // {errors.textMessage  ? <div>{errors.textMessage}</div> : null} */}
              <Field
                name="textMessage"
                type="text"
                className="border-0 p-1 ps-3 m-1 form-control"
              />
              <SendButton disable={values.textMessage.length > 0} />
            </div>
          </Form>
        )}
      </Formik>

      {messageSent ? (
        <div>Не удалось отправить сообщение, повторите попытку позже...</div>
      ) : null}
    </div>
  );
};

export default SendForm;

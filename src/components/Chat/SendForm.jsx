/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';

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
        <Form className="py-1 border rounded-2">
          <div className="input-group has-validation">
            {/* // {errors.textMessage  ? <div>{errors.textMessage}</div> : null} */}
            <Field
              name="textMessage"
              type="text"
              className="border-0 p-0 ps-2 form-control"
            />

            <button type="submit" className="btn btn-primary m-2 rounded-2">
              Отправить
            </button>
          </div>
        </Form>
      </Formik>
      {messageSent ? (
        <div>Не удалось отправить сообщение, повторите попытку позже...</div>
      ) : null}
    </div>
  );
};

export default SendForm;

// <svg
// xmlns="http://www.w3.org/2000/svg"
// viewBox="0 0 16 16"
// width="20"
// height="20"
// fill="currentColor"
// >
// <path
//   fillRule="evenodd"
//   d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0
//  2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0
// 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5
// 0 1 0-.708.708L10.293 7.5H4.5z"
// ></path>
// </svg>

//  <form noValidate="" className="py-1 border rounded-2">
//         <div className="input-group has-validation">
//           <input
//             name="body"
//             aria-label="Новое сообщение"
//             placeholder="Введите сообщение..."
//             className="border-0 p-0 ps-2 form-control"
//             value={message}
//             onChange={sendHandler}
//           />
//           <button
//             type="submit"
//             onClick={buttonHit}
//             disabled=""
//             className="btn btn-primary"
//           >
//             {/* убрал отсюда svg */}
//             <span>Отправить</span>
//           </button>
//         </div>
//       </form>

/* eslint-disable consistent-return */
/* eslint-disable functional/no-let */
/* eslint-disable react/function-component-definition */
import { Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import {
  selectors as messageSelector,
  actions as messagesAction,
} from '../../slices/messagesSlice.js';
import {
  actions as channelsAction,
} from '../../slices/channelsSlice.js';

const ChannelsModal = (props) => {
  const {
    type,
    show,
    handleClose,
    channelId,
    channelsList,
    socket,
    channelName,
    setCurrentChannel,
  } = props;
  // console.log('modal props is', props);
  const dispatch = useDispatch();
  const messagesList = useSelector(messageSelector.selectAll);
  const [err, setErr] = useState('');

  socket.on('newChannel', (msg) => {
    setCurrentChannel({ id: msg.id, name: msg.name });
    dispatch(channelsAction.addChannel(msg));
  });

  socket.on('renameChannel', (msg) => {
    dispatch(channelsAction.renameChannel({ id: msg.id, changes: { name: msg.name } }));
  });

  socket.on('removeChannel', (msg) => {
    const messagesOfRemoveChannel = messagesList
      .filter((message) => message.channelId === msg.id)
      .map((message) => message.id);
    setCurrentChannel({ id: 1, name: 'general' });
    dispatch(messagesAction.removeAllMessages(messagesOfRemoveChannel));
    dispatch(channelsAction.removeChannel(msg.id));
  });

  let buttonText = '';
  let headerText = '';
  let placeHolderText = '';
  let buttonClass = '';
  switch (type) {
    case 'add':
      placeHolderText = 'Введите имя нового канала';
      headerText = 'Создать канал';
      buttonText = 'Отправить';
      buttonClass = 'primary';
      break;
    case 'rename':
      placeHolderText = 'Введите новое имя канала...';
      headerText = 'Переименовать канал';
      buttonText = 'Отправить';
      buttonClass = 'primary';
      break;
    case 'remove':
      headerText = 'Удалить канал';
      buttonText = 'Удалить';
      buttonClass = 'danger';
      break;
    default:
      return;
  }

  const channelSchema = Yup.object().shape({
    channelName: Yup.string()
      .required('Вы не ввели имя канал')
      .min(3, 'Имя канала не может быть меньше 3ех символов')
      .max(20, 'Имя канала не может быть больше 20 символов')
      .notOneOf(
        [channelsList.map((channel) => channel.name)],
        // eslint-disable-next-line comma-dangle
        'Данное имя уже занято'
      ),
  });

  return (
    <Formik
      initialValues={{
        channelName,
        action: type,
        channelId,
        placeHolderText,
        headerText,
        buttonText,
        buttonClass,
      }}
      onSubmit={async (values, actions) => {
        if (values.action !== 'remove') {
          try {
            await channelSchema.validate({
              channelName: values.channelName,
            });
            if (values.action === 'add') socket.emit('newChannel', { name: values.channelName });
            if (values.action === 'rename') socket.emit('renameChannel', { id: channelId, name: values.channelName });
            setErr('');
            actions.resetForm({ values: '' });
            handleClose();
          } catch ({ errors }) {
            setErr(errors[0]);
          }
        } else {
          setErr('');
          socket.emit('removeChannel', { id: channelId });
          handleClose();
        }
      }}
    >
      {/* eslint-disable-next-line object-curly-newline */}
      {({ handleSubmit, handleChange, values }) => (
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{values.headerText}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {values.action !== 'remove' ? (
                <Form.Group controlId="channelAddForm.ControlInput">
                  <Form.Control
                    autoFocus
                    type="text"
                    placeholder={values.placeHolderText}
                    name="channelName"
                    onChange={handleChange}
                    value={values.channelName}
                    isInvalid={err}
                  />
                  <Form.Control.Feedback type="invalid">
                    {err}
                  </Form.Control.Feedback>
                </Form.Group>
              ) : (
                'Уверены?'
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Отменить
            </Button>
            <Button
              variant={values.buttonClass}
              type="submit"
              onClick={handleSubmit}
            >
              {values.buttonText}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Formik>
  );
};

export default ChannelsModal;

// const texts = {
//   add: {
//     placeHolderText: 'Введите имя нового канала',
//     headerText: 'Создать канал',
//     buttonText: 'Отправить',
//     buttonClass: 'primary',
//   },
//   rename: {
//     placeHolderText: 'Введите новое имя канала...',
//     headerText: 'Переименовать канал',
//     buttonText: 'Отправить',
//     buttonClass: 'primary',
//   },
//   remove: {
//     headerText: 'Удалить канал',
//     buttonText: 'Удалить',
//     buttonClass: 'danger',
//   },
// };

// const init = {
//   channelName: '',
//   action: type,
//   placeHolderText: '',
//   headerText: '',
//   buttonText: '',
//   buttonClass: '',
//   ...texts[type],
// };
// console.log(init)
// const submitter = () => {
//   console.log('do action!', type);
// };

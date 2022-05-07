/* eslint-disable consistent-return */
/* eslint-disable functional/no-let */
/* eslint-disable react/function-component-definition */
import { Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import * as Yup from 'yup';

const ChannelsModal = (props) => {
  const {
    type,
    show,
    handleClose,
    channelId,
    channelsList,
    socket,
    channelsAction,
  } = props;
  const dispatch = useDispatch();
  const schema = Yup.object().shape({
    channelName: Yup.string()
      .required('Вы не ввели имя канала')
      .min(3, 'Имя канала не может быть меньше 3ех символов')
      .max(20, 'Имя канала не может быть больше 20 символов')
      .notOneOf(
        [channelsList.map((channel) => channel.name)],
        'Данное имя уже занято',
      ),
  });
  socket.on('newChannel', (msg) => {
    dispatch(channelsAction.addChannel(msg));
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

  return (
    <Formik
      initialValues={{
        channelName: '',
        action: type,
        placeHolderText,
        headerText,
        buttonText,
        buttonClass,
      }}
      validationSchema={schema}
      onSubmit={(values) => {
        switch (values.type) {
          case 'add':
            socket.emit('newChannel', { name: values.channelName });
            break;
          default:
            break;
        }
      }}
    >
      {({
        handleSubmit, handleChange, errors, values,
      }) => (
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{values.headerText}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {values.action !== 'remove' ? (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="channelAddForm.ControlInput">
                  <Form.Control
                    type="text"
                    placeholder={values.placeHolderText}
                    name="channelName"
                    onChange={handleChange}
                    value={values.channelName}
                    isInvalid={errors.channelName}
                    autoFocus
                  />
                </Form.Group>
                {errors.channelName}
              </Form>
            ) : (
              'Уверены?'
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Отменить
            </Button>
            <Button variant={values.buttonClass} onClick={handleSubmit}>
              {values.buttonText}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Formik>
  );
};

export default ChannelsModal;

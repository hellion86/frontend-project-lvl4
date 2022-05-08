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
    channelName,
  } = props;
  console.log('modal props is', props);
  const dispatch = useDispatch();
  const schema = Yup.object().shape({
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
      validationSchema={schema}
      onSubmit={(values, actions) => {
        console.log(values);
        // if (values.action === 'add') {
        //   socket.emit('newChannel', { name: values.channelName });
        actions.resetForm({ values: '' });
        //   handleClose();
        // }
      }}
    >
      {({ handleSubmit, handleChange, errors, values }) => (
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{values.headerText}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {values.action !== 'remove' ? (
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
                  {errors.channelName}
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

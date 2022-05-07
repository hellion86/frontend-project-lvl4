/* eslint-disable object-curly-newline */
/* eslint-disable functional/no-let */
/* eslint-disable react/function-component-definition */
import { Formik } from 'formik';
import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import * as Yup from 'yup';

const ChannelsModal = (props) => {
  const { type, show, handleClose, channelsList } = props;
  const schema = Yup.object().shape({
    channelName: Yup.string()
      .required('Вы не ввели имя канала')
      .min(3, 'Имя канала не может быть меньше 3ех символов')
      .max(20, 'Имя канала не может быть больше 20 символов')
      .notOneOf([channelsList], 'Данное имя уже занято'),
  });

  let action = '';
  let buttonText = '';
  let headerText = '';
  switch (type) {
    case 'add':
      action = (
        <Modal.Body>
          <Form>
            <Form.Group controlId="channelAddForm.ControlInput">
              <Form.Control type="text" placeholder="" autoFocus />
            </Form.Group>
          </Form>
        </Modal.Body>
      );
      headerText = 'Создать канал';
      buttonText = 'Отправить';
      break;
    case 'remove':
      action = <Modal.Body>Уверены?</Modal.Body>;
      headerText = 'Удалить канал';
      buttonText = 'Удалить';
      break;
    case 'rename':
      action = (
        <Modal.Body>
          <Form>
            <Form.Group controlId="channelRenameForm.ControlInput">
              <Form.Control
                type="text"
                placeholder="Введите новое имя канала..."
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
      );
      headerText = 'Переименовать канал';
      buttonText = 'Отправить';
      break;
    default:
      return '';
  }
  return (
    <Formik
      initialValues={{
        channelName: 'ssss',
      }}
      validationSchema={schema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ handleSubmit, values }) => (
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{headerText}</Modal.Title>
          </Modal.Header>
          {action}
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Отменить
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              {buttonText}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Formik>
  );
};

export default ChannelsModal;

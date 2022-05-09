/* eslint-disable object-curly-newline */
/* eslint-disable react/function-component-definition */
import { Formik } from 'formik';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';

import { actions as channelsAction } from '../../slices/channelsSlice.js';
import { prepareStateFormik, validateSchema } from './modalUtils.js';

const ChannelsModal = (props) => {
  const { handleClose, channelsList, socket, setCurrentChannel, modalData } = props;
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const dispatch = useDispatch();
  const [err, setErr] = useState('');
  const channelSchema = validateSchema(channelsList);

  socket.on('newChannel', (msg) => {
    setCurrentChannel({ id: msg.id, name: msg.name });
    dispatch(channelsAction.addChannel(msg));
  });

  socket.on('renameChannel', (msg) => {
    const newNameOfChannel = { id: msg.id, changes: { name: msg.name } };
    dispatch(channelsAction.renameChannel(newNameOfChannel));
  });

  socket.on('removeChannel', (msg) => {
    setCurrentChannel({ id: 1, name: 'general' });
    dispatch(channelsAction.removeChannel(msg.id));
  });

  return (
    <Formik
      initialValues={prepareStateFormik(modalData.type, modalData.channelName)}
      onSubmit={async (values, actions) => {
        if (values.action !== 'remove') {
          try {
            await channelSchema.validate({
              channelName: values.channelName,
            });
            if (values.action === 'add') socket.emit('newChannel', { name: values.channelName });
            if (values.action === 'rename') socket.emit('renameChannel', { id: modalData.id, name: values.channelName });
            setErr('');
            actions.resetForm({ values: '' });
            handleClose();
          } catch ({ errors }) {
            setErr(errors[0]);
          }
        } else {
          setErr('');
          socket.emit('removeChannel', { id: modalData.id });
          handleClose();
        }
      }}
    >
      {({ handleSubmit, handleChange, values }) => (
        <Modal show={modalData.show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{values.headerText}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {values.action !== 'remove' ? (
                <Form.Group controlId="channelAddForm.ControlInput">
                  <Form.Control
                    ref={inputRef}
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
                <div ref={inputRef}>Уверены?</div>
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

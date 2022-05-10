/* eslint-disable object-curly-newline */
/* eslint-disable react/function-component-definition */
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import React, { useState, useEffect, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { prepareStateFormik, validateSchema } from './modalUtils.js';
import { actions as channelsAction } from '../../slices/channelsSlice.js';

const ChannelsModal = ({ handleClose, channelsList, socket, setCurrentChannel, modalData }) => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const [err, setErr] = useState('');
  const channelSchema = validateSchema(channelsList);
  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current.focus();
    // socket.on('newChannel', (msg) => {
    //   console.log('for me');
    //   setCurrentChannel({ id: msg.id, name: msg.name });
    //   dispatch(channelsAction.addChannel(msg));
    // });
  }, []);

  return (
    <Formik
      initialValues={prepareStateFormik(modalData.type, modalData.channelName)}
      onSubmit={async (values, actions) => {
        if (values.action !== 'remove') {
          try {
            await channelSchema.validate({
              channelName: values.channelName,
            });
            if (values.action === 'add') {
              console.log('i am add a channel');
              socket.emit('newChannel', { name: values.channelName });
            }
            if (values.action === 'rename') {
              console.log('i am rename a channel');
              socket.emit('renameChannel', { id: modalData.id, name: values.channelName });
            }
            setErr('');
            actions.resetForm({ values: '' });
            handleClose();
          } catch ({ errors }) {
            setErr(errors[0]);
          }
        } else {
          console.log(' hmm, i just remove channel');
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
            <Form onSubmit={handleSubmit}>
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
                <div ref={inputRef}>{t('channelsList.modal.remove.confirm')}</div>
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

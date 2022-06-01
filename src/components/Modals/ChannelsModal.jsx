/* eslint-disable object-curly-newline */
/* eslint-disable react/function-component-definition */
import { Formik } from 'formik';
import React, { useState, useEffect, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import { prepareStateFormik, validateSchema, modalMapper } from './modalUtils.js';
import chatApiContext from '../../hooks/useContent.jsx';

const ChannelsModal = ({ handleClose, channelsList, modalData }) => {
  const { t } = useTranslation();
  const content = chatApiContext();
  const inputRef = useRef();
  const channelSchema = validateSchema(channelsList);
  const [err, setErr] = useState('');
  const notify = (msg) => toast.success(msg);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <>
      <Formik
        initialValues={prepareStateFormik(
          modalData.type,
          modalData.channelName,
        )}
        onSubmit={async (values, actions) => {
          const modalHandler = modalMapper(
            content,
            modalData.id,
            values.channelName,
            values.action,
          );
          if (values.action === 'remove') {
            modalHandler();
            handleClose();
            notify(t(`toast.${values.action}`));
          }
          try {
            await channelSchema.validate({
              channelName: values.channelName,
            });
            modalHandler();
            notify(t(`toast.${values.action}`));
            setErr('');
            actions.resetForm({ values: '' });
            handleClose();
          } catch ({ errors }) {
            setErr(errors[0]);
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
                    <Form.Label className="visually-hidden">{t('channelsList.modal.hiddenSearch')}</Form.Label>
                    <Form.Control.Feedback type="invalid">
                      {t(`${err}`)}
                    </Form.Control.Feedback>
                  </Form.Group>
                ) : (
                  <div ref={inputRef}>
                    {t('channelsList.modal.remove.confirm')}
                  </div>
                )}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                {t('channelsList.modal.cancelButton')}
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
      <ToastContainer />
    </>
  );
};

export default ChannelsModal;

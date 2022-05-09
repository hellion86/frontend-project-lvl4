/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ErrorModal = ({ show, handleClose }) => {
  const { t } = useTranslation();
  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('appErrors.modal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('appErrors.modal.body')}
      </Modal.Body>
    </Modal>
  );
};

export default ErrorModal;

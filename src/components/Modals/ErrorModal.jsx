/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ErrorModal = ({ show }) => {
  const { t } = useTranslation();
  return (
    <Modal
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>{t('appErrors.modal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('appErrors.modal.failFetch')}
      </Modal.Body>
    </Modal>
  );
};

export default ErrorModal;

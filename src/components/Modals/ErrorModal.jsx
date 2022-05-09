/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { Modal } from 'react-bootstrap';

const ErrorModal = ({ show, handleClose }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Что то пошло не так...</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Мущщина, не видите у нас в чате обед, приходите позже!
      </Modal.Body>
    </Modal>
  );
};

export default ErrorModal;

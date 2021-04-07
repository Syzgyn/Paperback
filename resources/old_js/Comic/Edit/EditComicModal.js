import PropTypes from 'prop-types';
import React from 'react';
import Modal from '@/Components/Modal/Modal';
import EditComicModalContentConnector from './EditComicModalContentConnector';

function EditComicModal({ isOpen, onModalClose, ...otherProps }) {
  return (
    <Modal
      isOpen={isOpen}
      onModalClose={onModalClose}
    >
      <EditComicModalContentConnector
        {...otherProps}
        onModalClose={onModalClose}
      />
    </Modal>
  );
}

EditComicModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default EditComicModal;

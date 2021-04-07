import PropTypes from 'prop-types';
import React from 'react';
import Modal from '@/Components/Modal/Modal';
import DeleteComicModalContentConnector from './DeleteComicModalContentConnector';

function DeleteComicModal(props) {
  const {
    isOpen,
    onModalClose,
    ...otherProps
  } = props;

  return (
    <Modal
      isOpen={isOpen}
      onModalClose={onModalClose}
    >
      <DeleteComicModalContentConnector
        {...otherProps}
        onModalClose={onModalClose}
      />
    </Modal>
  );
}

DeleteComicModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default DeleteComicModal;

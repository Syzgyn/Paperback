import PropTypes from 'prop-types';
import React from 'react';
import Modal from '@/Components/Modal/Modal';
import ComicHistoryModalContentConnector from './ComicHistoryModalContentConnector';

function ComicHistoryModal(props) {
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
      <ComicHistoryModalContentConnector
        {...otherProps}
        onModalClose={onModalClose}
      />
    </Modal>
  );
}

ComicHistoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default ComicHistoryModal;

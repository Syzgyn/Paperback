import PropTypes from 'prop-types';
import React from 'react';
import Modal from '@/Components/Modal/Modal';
import ComicIndexOverviewOptionsModalContentConnector from './ComicIndexOverviewOptionsModalContentConnector';

function ComicIndexOverviewOptionsModal({ isOpen, onModalClose, ...otherProps }) {
  return (
    <Modal
      isOpen={isOpen}
      onModalClose={onModalClose}
    >
      <ComicIndexOverviewOptionsModalContentConnector
        {...otherProps}
        onModalClose={onModalClose}
      />
    </Modal>
  );
}

ComicIndexOverviewOptionsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default ComicIndexOverviewOptionsModal;

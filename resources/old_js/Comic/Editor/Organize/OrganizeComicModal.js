import PropTypes from 'prop-types';
import React from 'react';
import Modal from '@/Components/Modal/Modal';
import OrganizeComicModalContentConnector from './OrganizeComicModalContentConnector';

function OrganizeComicModal(props) {
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
      <OrganizeComicModalContentConnector
        {...otherProps}
        onModalClose={onModalClose}
      />
    </Modal>
  );
}

OrganizeComicModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default OrganizeComicModal;

import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'Components/Modal/Modal';
import IssueFileEditorModalContentConnector from './IssueFileEditorModalContentConnector';

function IssueFileEditorModal(props) {
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
      {
        isOpen &&
          <IssueFileEditorModalContentConnector
            {...otherProps}
            onModalClose={onModalClose}
          />
      }
    </Modal>
  );
}

IssueFileEditorModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default IssueFileEditorModal;

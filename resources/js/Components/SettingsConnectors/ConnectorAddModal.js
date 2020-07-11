import React from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ConnectorAddModalContent from "./ConnectorAddModalContent";

const ConnectorAddModal = (props) => (
    <Modal
        isOpen={props.isOpen}
        toggle={props.toggleModal}
        className="settingsItemModal"
        size="xl"
    >
        <ModalHeader toggle={props.toggleModal}>
            Add Connector
        </ModalHeader>
        <ModalBody>
            <ConnectorAddModalContent
                onSchemaSelect={props.onSchemaSelect}
            />
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={props.toggleModal}>
                Close
            </Button>
        </ModalFooter>
    </Modal>
);

ConnectorAddModal.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onSchemaSelect: PropTypes.func.isRequired,
};

export default ConnectorAddModal;

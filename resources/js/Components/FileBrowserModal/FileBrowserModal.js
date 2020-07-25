import React from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import FileBrowserModalContent from "@/Components/FileBrowserModal/FileBrowserModalContent";

const FileBrowserModal = (props) => {

    function selectClick() {
        props.onSelectClick();
        props.toggleModal();
    }

    return (
        <Modal
            isOpen={props.modal}
            toggle={props.toggleModal}
            className="fileBrowserModal"
            size="lg"
        >
            <ModalHeader toggle={props.toggleModal}>File Browser</ModalHeader>
            <ModalBody>
                <FileBrowserModalContent />
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={props.toggleModal}>
                    Close
                </Button>
                <Button color="primary" onClick={selectClick}>
                    Select
                </Button>
            </ModalFooter>
        </Modal>
    );
}

FileBrowserModal.propTypes = {
    modal: PropTypes.bool,
    toggleModal: PropTypes.func,
    onSelectClick: PropTypes.func,
}

export default FileBrowserModal;

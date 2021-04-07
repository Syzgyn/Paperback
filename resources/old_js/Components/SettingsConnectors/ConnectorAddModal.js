import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ConnectorAddModalContent from "./ConnectorAddModalContent";
import { useDispatch, useSelector } from "react-redux";
import {
    toggleAddModal,
    settingsItemsSelector,
} from "@/Store/Slices/Settings/settingsConnectors";

const ConnectorAddModal = () => {
    const dispatch = useDispatch();
    const { showAddModal } = useSelector(settingsItemsSelector);

    function toggle() {
        dispatch(toggleAddModal());
    }

    return (
        <Modal
            isOpen={showAddModal}
            toggle={toggle}
            className="settingsItemModal"
            size="xl"
        >
            <ModalHeader toggle={toggle}>Add Connector</ModalHeader>
            <ModalBody>
                <ConnectorAddModalContent />
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ConnectorAddModal;

import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ConnectorEditModalContent from "./ConnectorEditModalContent";
import PageRow from "@/Components/Page/PageRow";
import { useDispatch, useSelector } from "react-redux";
import {
    toggleEditModal,
    testItem,
    submitItem,
    deleteItem,
    settingsItemsSelector,
} from "@/Store/Slices/Settings/settingsConnectors";

const ConnectorEditModal = () => {
    const dispatch = useDispatch();
    const formRef = React.createRef();
    const { selectedItem, selectedSchema, showEditModal } = useSelector(
        settingsItemsSelector
    );

    function prepareData() {
        let data = Object.assign({}, formRef.current.values);
        if (selectedItem !== null) {
            data.type = selectedItem.schema.type;
            data.id = selectedItem.id;
        } else {
            data.type = selectedSchema;
        }

        return data;
    }

    function onClickTest() {
        let data = prepareData();
        dispatch(testItem(data));
    }

    function onClickSave() {
        let data = prepareData();
        console.log(dispatch(submitItem(data)));
    }

    function onClickDelete() {
        dispatch(deleteItem(selectedItem.id));
    }

    function toggleModal() {
        dispatch(toggleEditModal());
    }

    const name = selectedItem
        ? selectedItem.schema.type
        : selectedSchema
        ? selectedSchema
        : "";

    return (
        <Modal
            isOpen={showEditModal}
            toggle={toggleModal}
            className="itemModal"
            size="xl"
        >
            <ModalHeader toggle={toggleModal}>{"Edit - " + name}</ModalHeader>
            <ModalBody>
                <PageRow>
                    <ConnectorEditModalContent
                        item={selectedItem}
                        toggleModal={toggleModal}
                        ref={formRef}
                    />
                </PageRow>
            </ModalBody>
            <ModalFooter>
                {selectedItem ? (
                    <Button color="danger mr-auto" onClick={onClickDelete}>
                        Delete
                    </Button>
                ) : (
                    <Button color="secondary mr-auto" onClick={toggleModal}>
                        Close
                    </Button>
                )}

                <Button color="secondary" onClick={onClickTest}>
                    Test
                </Button>
                <Button color="secondary" onClick={toggleModal}>
                    Cancel
                </Button>
                <Button color="primary" onClick={onClickSave}>
                    Save
                </Button>
            </ModalFooter>
        </Modal>
    );
};

ConnectorEditModal.propTypes = {};

export default ConnectorEditModal;

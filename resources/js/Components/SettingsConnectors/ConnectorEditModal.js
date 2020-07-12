import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ConnectorEditModalContent from "./ConnectorEditModalContent";
import PageRow from "@/Components/Page/PageRow";
import { useDispatch, useSelector } from  "react-redux";
import { getLocation } from "connected-react-router";
import { fetchIndexers, settingsIndexersSelector } from "@/Store/Slices/Settings/indexers";
import { fetchDownloaders, settingsDownloadersSelector } from "@/Store/Slices/Settings/downloaders";

const ConnectorEditModal = (props) => {
    const dispatch = useDispatch();
    const formRef = React.createRef();
    const { pathname } = useSelector(getLocation);

    let fetchFunc, selector;

    if (pathname === "/settings/indexers") {
        fetchFunc = fetchIndexers;
        selector = settingsIndexersSelector;
    } else {
        fetchFunc = fetchDownloaders;
        selector = settingsDownloadersSelector;
    }

    const selectedSchema = useSelector(selector);

    function prepareData() {
        let data = Object.assign({}, formRef.current.values);
        if (props.item !== undefined) {
            data.type = props.item.schema.type;
            data.id = props.item.id;
        } else {
            data.type = selectedSchema;
        }

        return data;
    }

    function onClickTest() {
        let data = prepareData();
        axios.post(props.url + "/test", data).then((response) => {
            if (response.data.result) {
                //setState({ testSuccess: true });
            }
        });
    }

    function onClickSave() {
        let data = prepareData();
        let { url } = props;
        let method = "post";
        const item = props.item;
        if (item) {
            url += "/" + item.id;
            method = "put";
        }

        axios[method](url, data).then(() => {
            props.toggleModal();
            dispatch(fetchFunc());
        });
    }

    function onClickDelete() {
        axios
            .delete(props.url + "/" + props.item.id)
            .then(() => {
                props.toggleModal();
                dispatch(fetchFunc());
            });
    }

    const { toggleModal, item } = props;

    const name = item
        ? item.schema.type
        : selectedSchema
        ? selectedSchema
        : "";

    return (
        <Modal
            isOpen={props.isOpen}
            toggle={toggleModal}
            className="itemModal"
            size="xl"
        >
            <ModalHeader toggle={props.toggleModal}>
                {"Edit - " + name}
            </ModalHeader>
            <ModalBody>
                <PageRow>
                    <ConnectorEditModalContent
                        item={item}
                        toggleModal={toggleModal}
                        ref={formRef}
                    />
                </PageRow>
            </ModalBody>
            <ModalFooter>
                {item ? (
                    <Button
                        color="danger mr-auto"
                        onClick={onClickDelete}
                    >
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
}

ConnectorEditModal.propTypes = {
    url: PropTypes.string,
    toggleModal: PropTypes.func,
    isOpen: PropTypes.bool,
    existingConnector: PropTypes.bool,
    item: PropTypes.shape({
        schema: PropTypes.shape({
            type: PropTypes.string,
        }),
        id: PropTypes.number,
    }),
    dispatch: PropTypes.func,
};

export default ConnectorEditModal;

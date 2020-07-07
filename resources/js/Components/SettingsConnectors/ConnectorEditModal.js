import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ConnectorEditModalContent from "./ConnectorEditModalContent";
import PageRow from "@/Components/Page/PageRow";

class ConnectorEditModal extends Component {
    constructor() {
        super();
        this.state = {
            testSuccess: false,
        };

        this.formRef = React.createRef();
        this.onClickTest = this.onClickTest.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
    }

    prepareData() {
        let data = this.formRef.current.values;
        if (this.props.item !== undefined) {
            data.type = this.props.item.schema.type;
        } else {
            data.type = this.props.implementation.type;
        }

        return data;
    }

    onClickTest() {
        this.setState({ testSuccess: false });
        let data = this.prepareData();
        axios.post(this.props.url + "/test", data).then((response) => {
            if (response.data.result) {
                this.setState({ testSuccess: true });
            }
        });
    }

    onClickSave() {
        let data = this.prepareData();
        let { url } = this.props;
        let method = "post";
        const item = this.props.item;
        if (item) {
            url += "/" + item.id;
            method = "put";
        }

        axios[method](url, data).then(this.props.toggleModal(true));
    }

    onClickDelete() {
        axios
            .delete(this.props.url + "/" + this.props.item.id)
            .then(this.props.toggleModal(true));
    }

    render() {
        const { toggleModal, implementation, item } = this.props;

        const name = item
            ? item.schema.type
            : implementation
            ? implementation.type
            : "";

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={toggleModal}
                className="itemModal"
                size="xl"
            >
                <ModalHeader toggle={this.props.toggleModal}>
                    {"Edit - " + name}
                </ModalHeader>
                <ModalBody>
                    <PageRow>
                        <ConnectorEditModalContent
                            item={item}
                            implementation={implementation}
                            toggleModal={toggleModal}
                            formRef={this.formRef}
                        />
                    </PageRow>
                </ModalBody>
                <ModalFooter>
                    {item ? (
                        <Button
                            color="danger mr-auto"
                            onClick={this.onClickDelete}
                        >
                            Delete
                        </Button>
                    ) : (
                        <Button color="secondary mr-auto" onClick={toggleModal}>
                            Close
                        </Button>
                    )}

                    {this.state.testSuccess ? <span>Test Successful</span> : ""}
                    <Button color="secondary" onClick={this.onClickTest}>
                        Test
                    </Button>
                    <Button color="secondary" onClick={toggleModal}>
                        Cancel
                    </Button>
                    <Button color="primary" onClick={this.onClickSave}>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

ConnectorEditModal.propTypes = {
    url: PropTypes.string,
    toggleModal: PropTypes.func,
    isOpen: PropTypes.bool,
    implementation: PropTypes.object,
    existingConnector: PropTypes.bool,
    item: PropTypes.shape({
        schema: PropTypes.shape({
            type: PropTypes.string,
        }),
        id: PropTypes.number,
    }),
};

export default ConnectorEditModal;

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import serialize from 'form-serialize'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import IndexerEditModalContent from './IndexerEditModalContent'

class IndexerEditModal extends Component
{
    constructor() {
        super();
        this.formRef = React.createRef();
        this.onClickTest = this.onClickTest.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
    }

    onClickTest() {
        let data = serialize(this.formRef.current, {hash:true});
        console.log(data);
    }

    onClickSave() {
        let data = serialize(this.formRef.current, {hash:true});
        console.log(data);
    }

    render()
    {
        const {
            toggleModal,
        } = this.props;

        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggleModal} className="indexerModal" size="lg">
                <ModalHeader toggle={this.props.toggleModal}>{this.props.name}</ModalHeader>
                <ModalBody>
                    <IndexerEditModalContent implementation={this.props.implementation} toggleModal={toggleModal} formRef={this.formRef}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.onClickTest} >Test</Button>
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                    <Button color="primary" onClick={this.onClickSave}>Save</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

IndexerEditModal.propTypes = {
    toggleModal: PropTypes.func,
    isOpen: PropTypes.bool,
    name: PropTypes.string,
    implementation: PropTypes.object,
}

export default IndexerEditModal;

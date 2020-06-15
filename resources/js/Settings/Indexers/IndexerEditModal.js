import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import serialize from 'form-serialize'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import IndexerEditModalContent from './IndexerEditModalContent'

class IndexerEditModal extends Component
{
    constructor() {
        super();
        this.state = {
            testSuccess: false,
        }

        this.formRef = React.createRef();
        this.onClickTest = this.onClickTest.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
    }
    
    prepareData()
    {
        let data = serialize(this.formRef.current, {hash:true});
        data.type = this.props.implementation.type;
        data.enableSearch = data.enableSearch === "on";

        return data;
    }

    onClickTest() {
        this.setState({testSuccess: false});
        let data = this.prepareData();
        axios.post('/api/indexer/test', data)
            .then(response => {
                if (response.data.result) {
                    this.setState({testSuccess: true});
                }
            });
    }

    onClickSave() {
        let data = this.prepareData();
        axios.post('/api/indexer', data)
            .then(response => {
                console.log(response);
            });
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
                    { this.state.testSuccess ?
                        <span>Test Successful</span>
                        : ""
                    }
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

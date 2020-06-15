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
        this.onClickDelete = this.onClickDelete.bind(this);
    }
    
    prepareData()
    {
        let data = serialize(this.formRef.current, {hash:true});
        if (this.props.indexer !== undefined) {
            data.type = this.props.indexer.schema.type;
        } else {
            data.type = this.props.implementation.type;
        }
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
        let url = '/api/indexer';
        let method = 'post';
        const indexer = this.props.indexer;
        if (indexer) {
            url += '/' + indexer.id;
            method = 'put'
        }

        axios[method](url, data)
            .then(response => {
                this.props.toggleModal(true);
            });
    }

    onClickDelete() {
        axios.delete('/api/indexer/' + this.props.indexer.id)
            .then(response => {
                this.props.toggleModal(true);
            });
    }

    render()
    {
        const {
            toggleModal,
            name,
            implementation,
            indexer,
        } = this.props;

        return (
            <Modal isOpen={this.props.isOpen} toggle={toggleModal} className="indexerModal" size="lg">
                <ModalHeader toggle={this.props.toggleModal}>{name}</ModalHeader>
                <ModalBody>
                    <IndexerEditModalContent indexer={indexer} implementation={implementation} toggleModal={toggleModal} formRef={this.formRef}/>
                </ModalBody>
                <ModalFooter>
                    { this.state.testSuccess ?
                        <span>Test Successful</span>
                        : ""
                    }
                    { indexer ? 
                        <Button color="danger mr-auto" onClick={this.onClickDelete} >Delete</Button>
                        :
                        <Button color="secondary mr-auto" onClick={toggleModal} >Close</Button>
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
    existingIndexer: PropTypes.bool,
}

export default IndexerEditModal;

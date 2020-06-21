import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ConnectorAddModalContent from './ConnectorAddModalContent'

class ConnectorAddModal extends Component
{
    render()
    {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggleModal} className="settingsItemModal" size="lg">
                <ModalHeader toggle={this.props.toggleModal}>Add Connector</ModalHeader>
                <ModalBody>
                    <ConnectorAddModalContent schema={this.props.schema} onModalClose={this.props.onModalClose}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.props.toggleModal}>Close</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

ConnectorAddModal.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    schema: PropTypes.array.isRequired,
    onModalClose: PropTypes.func.isRequired,
}

export default ConnectorAddModal;

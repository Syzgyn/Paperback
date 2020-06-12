import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class IndexerEditModal extends Component
{
    render()
    {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggleModal} className="indexerModal" size="lg">
                <ModalHeader toggle={this.props.toggleModal}>{this.props.name}</ModalHeader>
                <ModalBody>
                    {this.props.children}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.props.toggleModal}>Close</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

IndexerEditModal.propTypes = {
    toggleModal: PropTypes.func,
    isOpen: PropTypes.bool,
    name: PropTypes.string,
    children: PropTypes.node,
}

export default IndexerEditModal;

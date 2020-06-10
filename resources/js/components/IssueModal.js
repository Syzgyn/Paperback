import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DOMPurify from 'dompurify'

class IssueModal extends Component
{
    constructor() {
        super();
        this.state = {
            issue: {
                name: "",
                description: "",
            },
            modal: false,
        }

        this.close = this.close.bind(this);
    }

    close() {
        this.props.toggleModal();
    }
    

    render()
    {
        const name = this.props.issue ? this.props.issue.displayName : "";
        const description = this.props.issue ? this.props.issue.description : "";
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggleModal} className="issueModal" size="lg">
                <ModalHeader toggle={this.props.toggleModal}>{name}</ModalHeader>
                <ModalBody dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(description, { ADD_ATTR: ['target'] })}} >
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.close}>Close</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

IssueModal.propTypes = {
    toggleModal: PropTypes.func,
    isOpen: PropTypes.bool,
    issue: PropTypes.shape({
        displayName: PropTypes.string.isRequired,
        description: PropTypes.string
    }),
}

export default IssueModal;

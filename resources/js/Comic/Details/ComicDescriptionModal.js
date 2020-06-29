import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DOMPurify from 'dompurify'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ComicDescriptionModal extends Component
{
    render() {
        const {
            name,
            description,
            toggleModal,
            modal,
        } = this.props;

        return (
            <Modal isOpen={modal} toggle={toggleModal} className="comicDescriptionModal" size="lg">
                <ModalHeader>{name}</ModalHeader>
                <ModalBody> 
                    <div className="comic-description" 
                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(description, { ADD_ATTR: ['target'] })}} />
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleModal}>Close</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

ComicDescriptionModal.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    modal: PropTypes.bool,
    toggleModal: PropTypes.func,
}

export default ComicDescriptionModal

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DOMPurify from 'dompurify'
import IssueModalMenuBar from './IssueModalMenuBar'
import DescriptionTab from './DescriptionTab'
import SearchTab from './SearchTab'

class IssueModal extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            issue: {
                name: "",
                description: "",
            },
            modal: false,
            activeTab: props.activeTab, 
        }

        this.close = this.close.bind(this);
        this.onNavButtonClick = this.onNavButtonClick.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.activeTab !== this.props.activeTab) {
            this.setState({activeTab: this.props.activeTab});
        }
    }

    close() {
        this.props.toggleModal();
    }

    onNavButtonClick(event) {
        event.preventDefault();
        this.setState({activeTab: event.target.dataset.tabname});
    }
    
    getContent() {
        switch (this.state.activeTab) {
            case "description":
                const description = this.props.issue ? this.props.issue.description : "";
                return <DescriptionTab description={description} />
            case "search":
                const {triggerEvent} = this.props;
                return <SearchTab triggerEvent={triggerEvent} cvid={this.props.issue.cvid} />
            default:
                return null
        }
    }

    render()
    {
        const name = this.props.issue ? this.props.issue.displayName : "";
        const description = this.props.issue ? this.props.issue.description : "";
        const {
            activeTab,
        } = this.state;

        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggleModal} className="issueModal" size="lg">
                <ModalHeader toggle={this.props.toggleModal}>{name}</ModalHeader>
                <ModalBody> 
                    <IssueModalMenuBar activeTab={activeTab} onClickCallback={this.onNavButtonClick} />
                    {this.getContent()}
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
        displayName: PropTypes.string,
        description: PropTypes.string
    }),
}

export default IssueModal;

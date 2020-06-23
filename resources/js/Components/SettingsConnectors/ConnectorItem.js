import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Card, CardTitle, CardText} from 'reactstrap'
import ConnectorEditModal from './ConnectorEditModal'
import ConnectorBadge from './ConnectorBadge'

class ConnectorItem extends Component
{
    constructor() {
        super();
        this.state = {
            editModal: false,
            schema: {},
        }

        this.toggleEditModal = this.toggleEditModal.bind(this);
        this.openEditModal = this.openEditModal.bind(this);
        this.onEditModalClosed = this.onEditModalClosed.bind(this);
    }

    toggleEditModal(refresh = false) {
        if (refresh) {
            this.props.refreshCallback();
        }

        this.setState({editModal: !this.state.editModal});
    }

    onEditModalClosed() {
        this.setState({editModal: false});
    }

    openEditModal() {
        this.toggleEditModal();
    }

    render() {
        const {
            editModal,
        } = this.state;

        const {
            name,
            enableRss,
            enableSearch,
            enable,
        } = this.props.item;

        return (
            <Card onClick={this.openEditModal} className="settings-connector-item shadow p-3 m-3">
                <CardTitle>{name}</CardTitle>
                <CardText className="mt-2">
                    <ConnectorBadge enabled={enableRss} text="RSS" /> 
                    <ConnectorBadge enabled={enableSearch} text="Search" /> 
                    <ConnectorBadge enabled={enable} text="Enabled" /> 
                </CardText>
                <ConnectorEditModal isOpen={editModal} toggleModal={this.toggleEditModal} item={this.props.item} url={this.props.url}/>
            </Card>
        );
    }
}

ConnectorItem.propTypes = {
    url: PropTypes.string,
    item: PropTypes.object.isRequired,
    refreshCallback: PropTypes.func.isRequired,
}

export default ConnectorItem

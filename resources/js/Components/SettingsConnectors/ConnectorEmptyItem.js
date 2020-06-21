import React, {Component} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {Card, CardTitle, CardText} from 'reactstrap'
import ConnectorEditModal from './ConnectorEditModal'
import ConnectorAddModal from './ConnectorAddModal'

class ConnectorEmptyItem extends Component
{
    constructor() {
        super();
        this.state = {
            addModal: false,
            schema: [],
            implementation: null,
        }

        this.toggleAddModal = this.toggleAddModal.bind(this);
        this.toggleEditModal = this.toggleEditModal.bind(this);
        this.openAddModal = this.openAddModal.bind(this);
        this.onAddModalClosed = this.onAddModalClosed.bind(this);
        this.onEditModalClosed = this.onEditModalClosed.bind(this);
    }

    toggleAddModal() {
        this.setState({addModal: !this.state.addModal});
    }

    toggleEditModal(refresh) {
        if (refresh) {
            this.props.refreshCallback();
        }

        this.setState({editModal: !this.state.editModal});
    }

    onAddModalClosed(itemSelected = false, modelType = null) {
        this.setState({
            addModal: false,
            editModal: itemSelected,
            implementation: this.state.schema.find(item => item.type === modelType), 
        });
    }

    onEditModalClosed() {
        this.setState({editModal: false});
    }

    openAddModal() {
        if (!this.state.schema.length) {
            axios.get(this.props.url + '/schema')
                .then(response => {
                    this.setState({schema: response.data}, this.toggleAddModal());
                });
        } else {
            this.toggleAddModal();
        }
    }

    render() {
        const {
            addModal,
            editModal,
            implementation,
            schema,
        } = this.state;

        return (
            <Card onClick={this.openAddModal} className="settings-connector-item shadow p-3 m-3">
                <CardTitle>Add New Connector</CardTitle>
                <CardText>&nbsp;</CardText>
                <ConnectorAddModal isOpen={addModal} toggleModal={this.toggleAddModal} schema={schema} onModalClose={this.onAddModalClosed} url={this.props.url} />
                <ConnectorEditModal isOpen={editModal} toggleModal={this.toggleEditModal} implementation={implementation} existingConnector={false} url={this.props.url} />
            </Card>
        );
    }
}

ConnectorEmptyItem.propTypes = {
    refreshCallback: PropTypes.func.isRequired,
    url: PropTypes.string,
}

export default ConnectorEmptyItem

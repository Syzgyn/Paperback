import React, {Component} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {Badge, Card, CardTitle, CardText} from 'reactstrap'
import IndexerEditModal from './IndexerEditModal'

class IndexerItem extends Component
{
    constructor() {
        super();
        this.state = {
            editModal: false,
            schema: {},
            implementation: {},
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
            implementation,
        } = this.state;

        const {
            name,
            enableSearch,
        } = this.props.indexer;

        console.log(this.props.indexer);
        const searchBadgeColor = enableSearch ? "success" : "danger";

        return (
            <Card onClick={this.openEditModal} className="indexer-item shadow p-3 m-3">
                <CardTitle>{name}</CardTitle>
                <CardText><Badge color={searchBadgeColor}>Search</Badge></CardText>
                <IndexerEditModal isOpen={editModal} toggleModal={this.toggleEditModal} indexer={this.props.indexer}/>
            </Card>
        );
    }
}

IndexerItem.propTypes = {
    indexer: PropTypes.object.isRequired,
}

export default IndexerItem

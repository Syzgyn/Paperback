import React, {Component} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {Card, CardTitle, CardText} from 'reactstrap'
import IndexerEditModal from './IndexerEditModal'
import IndexerAddModal from './IndexerAddModal'

class IndexerEmptyItem extends Component
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

    onAddModalClosed(indexerSelected = false, modelType = null) {
        this.setState({
            addModal: false,
            editModal: indexerSelected,
            implementation: this.state.schema.find(indexer => indexer.type === modelType), 
        });
    }

    onEditModalClosed() {
        this.setState({editModal: false});
    }

    openAddModal() {
        if (!this.state.schema.length) {
            axios.get('/api/indexer/schema')
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
            <Card onClick={this.openAddModal} className="indexer-item shadow p-3 m-3">
                <CardTitle>Add New Indexer</CardTitle>
                <CardText>&nbsp;</CardText>
                <IndexerAddModal isOpen={addModal} toggleModal={this.toggleAddModal} schema={schema} onModalClose={this.onAddModalClosed}/>
                <IndexerEditModal isOpen={editModal} toggleModal={this.toggleEditModal} implementation={implementation} existingIndexer={false}/>
            </Card>
        );
    }
}

IndexerEmptyItem.propTypes = {
    refreshCallback: PropTypes.func.isRequired,
}

export default IndexerEmptyItem

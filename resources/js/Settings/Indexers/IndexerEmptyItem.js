import React, {Component} from 'react'
import axios from 'axios'
import {Card, CardTitle} from 'reactstrap'
import IndexerEditModal from './IndexerEditModal'
import IndexerAddModal from './IndexerAddModal'

class IndexerEmptyItem extends Component
{
    constructor() {
        super();
        this.state = {
            addModal: false,
            schema: [],
            implementation: {},
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

    toggleEditModal() {
        this.setState({editModal: !this.state.editModal});
    }

    onAddModalClosed(indexerSelected = false, implementation = {}) {
        this.setState({
            addModal: false,
            editModal: indexerSelected,
            implementation: this.state.schema.find(indexer => indexer.type === implementation), 
        });
    }

    onEditModalClosed() {
        this.setState({editModal: false});
    }

    openAddModal() {
        console.log("opening");
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
                <IndexerAddModal isOpen={addModal} toggleModal={this.toggleAddModal} schema={schema} onModalClose={this.onAddModalClosed}/>
                <IndexerEditModal isOpen={editModal} toggleModal={this.toggleEditModal} implementation={implementation}/>
            </Card>
        );
    }
}

export default IndexerEmptyItem

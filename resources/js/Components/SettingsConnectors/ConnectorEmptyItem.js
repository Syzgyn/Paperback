import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card } from "reactstrap";
import { Plus } from "react-feather";
import ConnectorEditModal from "./ConnectorEditModal";
import ConnectorAddModal from "./ConnectorAddModal";
import { connect } from "react-redux";
import { fetchIndexers, deselectSchema } from "@/Store/Slices/Settings/indexers";

class ConnectorEmptyItem extends Component {
    constructor() {
        super();
        this.state = {
            addModal: false,
        };

        this.toggleAddModal = this.toggleAddModal.bind(this);
        this.toggleEditModal = this.toggleEditModal.bind(this);
        this.schemaSelected = this.schemaSelected.bind(this);
        this.onEditModalClosed = this.onEditModalClosed.bind(this);
    }

    toggleAddModal() {
        this.setState({ addModal: !this.state.addModal });
    }

    toggleEditModal(refresh) {
        if (refresh) {
            this.props.dispatch(fetchIndexers());
        }

        this.setState({ editModal: !this.state.editModal });
    }

    schemaSelected() {
        this.setState({addModal: false, editModal: true});
    }

    onEditModalClosed() {
        this.setState({ editModal: false });
        this.props.dispatch(deselectSchema());
    }

    render() {
        const { addModal, editModal } = this.state;

        return (
            <Card
                onClick={this.toggleAddModal}
                className="settings-connector-item add-item shadow p-3 m-3 text-center"
            >
                <Plus size={60} />
                <ConnectorAddModal
                    isOpen={addModal}
                    toggleModal={this.toggleAddModal}
                    onSchemaSelect={this.schemaSelected}
                />
                <ConnectorEditModal
                    isOpen={editModal}
                    toggleModal={this.toggleEditModal}
                    existingConnector={false}
                    url={this.props.url}
                />
            </Card>
        );
    }
}

ConnectorEmptyItem.propTypes = {
    url: PropTypes.string,
    dispatch: PropTypes.func,
};

export default connect()(ConnectorEmptyItem);

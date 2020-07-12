import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card } from "reactstrap";
import { Plus } from "react-feather";
import ConnectorEditModal from "./ConnectorEditModal";
import ConnectorAddModal from "./ConnectorAddModal";
import { connect } from "react-redux";
import { deselectSchema as indexerDeselect } from "@/Store/Slices/Settings/indexers";
import { deselectSchema as downloaderDeselect } from "@/Store/Slices/Settings/downloaders";

class ConnectorEmptyItem extends Component {
    constructor() {
        super();
        this.state = {
            addModal: false,
        };

        this.toggleAddModal = this.toggleAddModal.bind(this);
        this.toggleEditModal = this.toggleEditModal.bind(this);
        this.schemaSelected = this.schemaSelected.bind(this);
    }

    toggleAddModal() {
        this.setState({ addModal: !this.state.addModal });
    }

    toggleEditModal() {
        this.setState({ editModal: !this.state.editModal });

        if (this.props.pathname === "/settings/indexers") {
            this.props.dispatch(indexerDeselect());
        } else {
            this.props.dispatch(downloaderDeselect());
        }
    }

    schemaSelected() {
        this.setState({addModal: false, editModal: true});
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
    pathname: PropTypes.string,
};

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
})

export default connect(mapStateToProps)(ConnectorEmptyItem);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, CardTitle, CardText } from "reactstrap";
import ConnectorEditModal from "./ConnectorEditModal";
import ConnectorBadge from "./ConnectorBadge";

class ConnectorItem extends Component {
    constructor() {
        super();
        this.state = {
            modal: false,
        };

        this.toggleEditModal = this.toggleEditModal.bind(this);
        this.openEditModal = this.openEditModal.bind(this);
        this.onEditModalClosed = this.onEditModalClosed.bind(this);
    }

    toggleEditModal() {
        this.setState({ modal: !this.state.modal});
    }

    onEditModalClosed() {
        this.setState({ modal: false });
    }

    openEditModal() {
        this.toggleEditModal();
    }

    render() {
        const { modal } = this.state;

        const { name, enableRss, enableSearch, enable } = this.props.item;

        return (
            <Card
                onClick={this.openEditModal}
                className="settings-connector-item shadow p-3 m-3"
            >
                <CardTitle>{name}</CardTitle>
                <CardText className="mt-2">
                    <ConnectorBadge enabled={enableRss} text="RSS" />
                    <ConnectorBadge enabled={enableSearch} text="Search" />
                    <ConnectorBadge enabled={enable} text="Enabled" />
                </CardText>
                <ConnectorEditModal
                    isOpen={modal}
                    toggleModal={this.toggleEditModal}
                    item={this.props.item}
                    url={this.props.url}
                />
            </Card>
        );
    }
}

ConnectorItem.propTypes = {
    url: PropTypes.string,
    item: PropTypes.object.isRequired,
};

export default ConnectorItem;

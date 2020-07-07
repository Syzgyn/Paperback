import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, CardTitle } from "reactstrap";

class ConnectorAddModalItem extends Component {
    constructor() {
        super();

        this.selectConnector = this.selectConnector.bind(this);
    }

    selectConnector() {
        this.props.onConnectorSelect(this.props.type);
    }

    render() {
        const { name } = this.props;

        return (
            <Card
                onClick={this.selectConnector}
                className="settings-connector-item shadow p-3 m-3"
            >
                <CardTitle>{name}</CardTitle>
            </Card>
        );
    }
}

ConnectorAddModalItem.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    onConnectorSelect: PropTypes.func.isRequired,
};

export default ConnectorAddModalItem;

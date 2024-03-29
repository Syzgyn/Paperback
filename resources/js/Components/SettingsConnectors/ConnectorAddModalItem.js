import React from "react";
import PropTypes from "prop-types";
import { Card, CardTitle } from "reactstrap";
import { useDispatch } from "react-redux";
import { selectSchemaAndToggleEditModal } from "@/Store/Slices/Settings/settingsConnectors";

const ConnectorAddModalItem = (props) => {
    const dispatch = useDispatch();
    const { name, type } = props;

    function selectConnector() {
        dispatch(selectSchemaAndToggleEditModal(type));
    }

    return (
        <Card
            onClick={selectConnector}
            className="settings-connector-item shadow p-3 m-3"
        >
            <CardTitle>{name}</CardTitle>
        </Card>
    );
};

ConnectorAddModalItem.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
};

export default ConnectorAddModalItem;

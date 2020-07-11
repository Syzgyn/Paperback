import React from "react";
import PropTypes from "prop-types";
import { Card, CardTitle } from "reactstrap";
import { useDispatch } from "react-redux";
import { selectSchema } from "@/Store/Slices/Settings/indexers";

const ConnectorAddModalItem = (props) => {
    const dispatch = useDispatch();
    const { name } = props;

    function selectConnector() {
        dispatch(selectSchema(props.type));
        props.onSchemaSelect();
    }

    return (
        <Card
            onClick={selectConnector}
            className="settings-connector-item shadow p-3 m-3"
        >
            <CardTitle>{name}</CardTitle>
        </Card>
    );
}

ConnectorAddModalItem.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    onSchemaSelect: PropTypes.func.isRequired,
};

export default ConnectorAddModalItem;

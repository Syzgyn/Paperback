import React from "react";
import PropTypes from "prop-types";
import { Card, CardTitle } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectSchema as indexerSelect } from "@/Store/Slices/Settings/indexers";
import { selectSchema as downloaderSelect } from "@/Store/Slices/Settings/downloaders";
import { getLocation } from "connected-react-router";

const ConnectorAddModalItem = (props) => {
    const dispatch = useDispatch();
    const { name } = props;
    const { pathname } = useSelector(getLocation);

    let selectSchema;

    if (pathname === "/settings/indexers") {
        selectSchema = indexerSelect;
    } else {
        selectSchema = downloaderSelect;
    }


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

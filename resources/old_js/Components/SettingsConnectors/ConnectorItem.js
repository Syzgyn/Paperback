import React from "react";
import PropTypes from "prop-types";
import { Card, CardTitle, CardText } from "reactstrap";
import ConnectorBadge from "./ConnectorBadge";
import { showItem } from "@/Store/Slices/Settings/settingsConnectors";
import { useDispatch } from "react-redux";

const ConnectorItem = ({ item }) => {
    const dispatch = useDispatch();

    function toggleEditModal() {
        dispatch(showItem(item));
    }

    const { name, enableRss, enableSearch, enable } = item;

    return (
        <Card
            onClick={toggleEditModal}
            className="settings-connector-item shadow p-3 m-3"
        >
            <CardTitle>{name}</CardTitle>
            <CardText className="mt-2">
                <ConnectorBadge enabled={enableRss} text="RSS" />
                <ConnectorBadge enabled={enableSearch} text="Search" />
                <ConnectorBadge enabled={enable} text="Enabled" />
            </CardText>
        </Card>
    );
};

ConnectorItem.propTypes = {
    url: PropTypes.string,
    item: PropTypes.object.isRequired,
};

export default ConnectorItem;

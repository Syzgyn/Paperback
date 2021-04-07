import React from "react";
import PropTypes from "prop-types";
import PageRow from "@/Components/Page/PageRow";
import ConnectorItem from "./ConnectorItem";
import ConnectorEmptyItem from "./ConnectorEmptyItem";
import ConnectorAddModal from "@/Components/SettingsConnectors/ConnectorAddModal";
import ConnectorEditModal from "@/Components/SettingsConnectors/ConnectorEditModal";

const ConnectorList = ({ items, url }) => (
    <PageRow className="settings-connector-list">
        {items.map((item) => (
            <ConnectorItem key={item.id} item={item} url={url} />
        ))}
        <ConnectorEmptyItem url={url} />
        <ConnectorAddModal />
        <ConnectorEditModal />
    </PageRow>
);

ConnectorList.propTypes = {
    items: PropTypes.array.isRequired,
    url: PropTypes.string.isRequired,
};

export default ConnectorList;

import React from "react";
import { Card } from "reactstrap";
import { Plus } from "react-feather";
import { useDispatch } from "react-redux";
import { toggleAddModal } from "@/Store/Slices/Settings/settingsConnectors";

const ConnectorEmptyItem = () => {
    const dispatch = useDispatch();

    function toggle() {
        dispatch(toggleAddModal());
    }

    return (
        <Card
            onClick={toggle}
            className="settings-connector-item add-item shadow p-3 m-3 text-center"
        >
            <Plus size={60} />
        </Card>
    );
};

export default ConnectorEmptyItem;

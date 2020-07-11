import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ConnectorAddModalItem from "./ConnectorAddModalItem";
import LoadingIndicator from "@/Components/Loading/LoadingIndicator";

import { useDispatch, useSelector } from "react-redux";
import { fetchSchema, settingsIndexersSelector } from "@/Store/Slices/Settings/indexers";

const ConnectorAddModalContent = (props) => {
    const dispatch = useDispatch();
    const { isSchemaLoading, isSchemaPopulated, schema } = useSelector(settingsIndexersSelector);

    useEffect(() => {
        dispatch(fetchSchema());
    }, [dispatch]);

    if (isSchemaLoading || !isSchemaPopulated) {
        return <LoadingIndicator />
    }

    //TODO: Update title from schema
    return (
        <>
            <h2>Usenet</h2>
            <div className="settings-item-list">
                {schema
                    .filter((item) => {
                        return item.protocol == "usenet";
                    })
                    .map((item) => (
                        <ConnectorAddModalItem
                            key={item.name}
                            {...item}
                            onSchemaSelect={props.onSchemaSelect}
                        />
                    ))}
            </div>
        </>
    );
}

ConnectorAddModalContent.propTypes = {
    onSchemaSelect: PropTypes.func.isRequired,
};

export default ConnectorAddModalContent;

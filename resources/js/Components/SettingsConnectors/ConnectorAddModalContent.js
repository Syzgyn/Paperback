import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ConnectorAddModalItem from "./ConnectorAddModalItem";
import LoadingIndicator from "@/Components/Loading/LoadingIndicator";
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from "connected-react-router";
import { fetchSchema as indexerSchema, settingsIndexersSelector } from "@/Store/Slices/Settings/indexers";
import { fetchSchema as downloaderSchema, settingsDownloadersSelector } from "@/Store/Slices/Settings/downloaders";

const ConnectorAddModalContent = (props) => {
    const dispatch = useDispatch();
    const { pathname } = useSelector(getLocation);
    
    let fetchSchema, selector;

    if (pathname === "/settings/indexers") {
        fetchSchema = indexerSchema;
        selector = settingsIndexersSelector;
    } else {
        fetchSchema = downloaderSchema;
        selector = settingsDownloadersSelector;
    }

    const { isSchemaLoading, isSchemaPopulated, schema } = useSelector(selector);

    useEffect(() => {
        dispatch(fetchSchema());
    }, [dispatch, fetchSchema]);

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

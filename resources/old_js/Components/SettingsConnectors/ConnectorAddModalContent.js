import React, { useEffect } from "react";
import ConnectorAddModalItem from "./ConnectorAddModalItem";
import LoadingIndicator from "@/Components/Loading/LoadingIndicator";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchSchema,
    settingsItemsSelector,
} from "@/Store/Slices/Settings/settingsConnectors";

const ConnectorAddModalContent = () => {
    const dispatch = useDispatch();
    const { isSchemaLoading, isSchemaPopulated, schema } = useSelector(
        settingsItemsSelector
    );

    useEffect(() => {
        dispatch(fetchSchema());
    }, [dispatch]);

    if (isSchemaLoading || !isSchemaPopulated) {
        return <LoadingIndicator />;
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
                        <ConnectorAddModalItem key={item.name} {...item} />
                    ))}
            </div>
            <h2>Direct Download</h2>
            <div className="settings-item-list">
                {schema
                    .filter((item) => {
                        return item.protocol == "ddl";
                    })
                    .map((item) => (
                        <ConnectorAddModalItem key={item.name} {...item} />
                    ))}
            </div>
        </>
    );
};

export default ConnectorAddModalContent;

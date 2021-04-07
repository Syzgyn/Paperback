import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingIndicator from "@/Components/Loading/LoadingIndicator";
import {
    fetchItems,
    settingsItemsSelector,
} from "@/Store/Slices/Settings/settingsConnectors";
import ConnectorList from "@/Components/SettingsConnectors/ConnectorList";

const DownloaderList = () => {
    const dispatch = useDispatch();
    const { isLoading, isPopulated, items } = useSelector(
        settingsItemsSelector
    );

    useEffect(() => {
        if (!isPopulated) {
            dispatch(fetchItems());
        }
    }, [dispatch, isPopulated]);

    if (isLoading || !isPopulated) {
        return <LoadingIndicator />;
    }

    return <ConnectorList items={items} url="/api/downloader" />;
};

export default DownloaderList;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingIndicator from "@/Components/Loading/LoadingIndicator";
import {
    fetchDownloaders,
    settingsDownloadersSelector,
} from "@/Store/Slices/Settings/downloaders";
import ConnectorList from '@/Components/SettingsConnectors/ConnectorList';

const DownloaderList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDownloaders());
    }, [dispatch]);

    const { isLoading, isPopulated, items } = useSelector(settingsDownloadersSelector);

    if (isLoading || !isPopulated) {
        return <LoadingIndicator />;
    }
    
    return <ConnectorList items={items} url="/api/downloader" />
}

export default DownloaderList;

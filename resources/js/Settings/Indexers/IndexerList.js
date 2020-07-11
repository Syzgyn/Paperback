import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingIndicator from "@/Components/Loading/LoadingIndicator";
import {
    fetchIndexers,
    settingsIndexersSelector,
} from "@/Store/Slices/Settings/indexers";
import ConnectorList from '@/Components/SettingsConnectors/ConnectorList';

const IndexerList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchIndexers());
    }, [dispatch]);

    const { isLoading, isPopulated, items } = useSelector(settingsIndexersSelector);

    if (isLoading || !isPopulated) {
        return <LoadingIndicator />;
    }
    
    return <ConnectorList items={items} url="/api/indexer" />
}

export default IndexerList;

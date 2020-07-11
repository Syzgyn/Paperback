import React from "react";
import SettingsMenuBar from "@/Settings/SettingsMenuBar";
import SettingsToolbar from "@/Settings/SettingsToolbar";
import IndexerList from "@/Settings/Indexers/IndexerList";

const IndexerSettings = () => {
    function onSavePress() {
        //TODO: General indexers settings
    }

    return (
        <>
            <SettingsMenuBar />
            <SettingsToolbar onSavePress={onSavePress} />
            <h2>Indexers</h2>
            <IndexerList />
        </>
    );
}

export default IndexerSettings;

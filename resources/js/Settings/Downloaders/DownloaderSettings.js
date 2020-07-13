import React from "react";
import SettingsMenuBar from "@/Settings/SettingsMenuBar";
import SettingsToolbar from "@/Settings/SettingsToolbar";
import DownloaderList from "@/Settings/Downloaders/DownloaderList";

const DownloaderSettings = () => {
    function onSavePress() {
        //TODO: General downloader settings
    }

    return (
        <>
            <SettingsMenuBar />
            <SettingsToolbar onSavePress={onSavePress} />
            <h2>Downloaders</h2>
            <DownloaderList />
        </>
    );
};

export default DownloaderSettings;

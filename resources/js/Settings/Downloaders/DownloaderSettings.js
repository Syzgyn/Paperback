import React, { Component } from "react";
import SettingsMenuBar from "@/Settings/SettingsMenuBar";
import SettingsToolbar from "@/Settings/SettingsToolbar";
import ConnectorList from "@/Components/SettingsConnectors/ConnectorList";

class DownloaderSettings extends Component {
    constructor() {
        super();
        this.state = {
            editModal: true,
            downloader: {},
        };

        this.url = "/api/downloader";

        this.onSavePress = this.onSavePress.bind(this);
        this.toggleEditModal = this.toggleEditModal.bind(this);
    }

    onSavePress() {
        //TODO: Any general indexer settings
    }

    toggleEditModal() {
        this.setState({ modal: !this.state.editModal });
    }

    render() {
        return (
            <>
                <SettingsMenuBar />
                <SettingsToolbar onSavePress={this.onSavePress} />
                <h2>Downloaders</h2>
                <ConnectorList url={this.url} />
            </>
        );
    }
}

export default DownloaderSettings;

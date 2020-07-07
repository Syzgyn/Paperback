import React, { Component } from "react";
import SettingsMenuBar from "@/Settings/SettingsMenuBar";
import SettingsToolbar from "@/Settings/SettingsToolbar";
import ConnectorList from "@/Components/SettingsConnectors/ConnectorList";

class IndexerSettings extends Component {
    constructor() {
        super();
        this.state = {
            editModal: true,
            indexer: {},
        };

        this.url = "/api/indexer";

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
                <h2>Indexers</h2>
                <ConnectorList url={this.url} />
            </>
        );
    }
}

export default IndexerSettings;

import React, {Component} from 'react'
import SettingsMenuBar from '@/Settings/SettingsMenuBar'
import SettingsToolbar from '@/Settings/SettingsToolbar'
import IndexerList from './IndexerList'

class IndexerSettings extends Component
{
    constructor() {
        super()
        this.state = {
            editModal: true,
            indexer: {},
        }
        this.onSavePress = this.onSavePress.bind(this);
        this.toggleEditModal = this.toggleEditModal.bind(this);
    }

    onSavePress() {
        //TODO: Any general indexer settings
    }

    toggleEditModal() {
        this.setState({modal: !this.state.editModal});
    }

    render() {
        return (
            <>
                <SettingsMenuBar />
                <SettingsToolbar onSavePress={this.onSavePress}/>
                <h2>Indexers</h2>
                <IndexerList />
            </>
        )
    }
}

export default IndexerSettings

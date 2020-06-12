import React, {Component} from 'react'
import PageRow from '@/Components/Page/PageRow'
import SettingsMenuBar from '@/Settings/SettingsMenuBar'

class DownloaderSettings extends Component
{
    render() {
        return (
            <>
                <SettingsMenuBar />
                <PageRow>
                    Downloader Settings go here
                </PageRow>
            </>
        )
    }
}

export default DownloaderSettings

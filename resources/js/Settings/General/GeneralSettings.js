import React, {Component} from 'react'
import SettingsMenuBar from '@/Settings/SettingsMenuBar'
import SettingsToolbar from '@/Settings/SettingsToolbar'
import PageRow from '@/Components/Page/PageRow'
import GeneralSettingsForm from '@/Settings/General/GeneralSettingsForm'

class GeneralSettings extends Component
{
    constructor()
    {
        super();

        this.onSavePress = this.onSavePress.bind(this);
    }

    onSavePress() {
        this.refs.generalForm.formRef.current.submitForm();
    }

    render() {
        return (
            <>
                <SettingsMenuBar />
                <SettingsToolbar onSavePress={this.onSavePress}/>
                <PageRow>
                    <h2>General</h2>
                </PageRow>
                <GeneralSettingsForm ref="generalForm" onSavePress={this.onSavePress}/>
            </>
        )
    }
}

export default GeneralSettings

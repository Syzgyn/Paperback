import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button} from 'reactstrap'

class SettingsToolbar extends Component
{
    constructor() {
        super()
        this.saveSettings = this.saveSettings.bind(this);
    }

    saveSettings(event) {
        event.preventDefault();

        const {
            onSavePress,
        } = this.props;

        onSavePress();
    }

    render() {
        const {
            onSavePress,
        } = this.props;

        return (
            <div className="row">
                <div className="col-1 offset-11">
                    <Button onClick={onSavePress}>Save</Button>
                </div>
            </div>
        );
    }
}

SettingsToolbar.propTypes = {
    onSavePress: PropTypes.func.isRequired,
}

export default SettingsToolbar

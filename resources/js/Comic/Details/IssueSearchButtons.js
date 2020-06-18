import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Search, User } from 'react-feather'
import {UncontrolledTooltip} from 'reactstrap'

class IssueSearchButtons extends Component
{
    constructor() {
        super();

        this.onAutoClick = this.onAutoClick.bind(this);
        this.onManualClick = this.onManualClick.bind(this);
    }

    onAutoClick() {
        this.props.clickCallback('searchAutomatic');
    }

    onManualClick() {
        this.props.clickCallback('searchManual');
    }

    render()
    {
        let {cvid} = this.props;

        return (
            <>
                <Search onClick={this.onAutoClick} id={"btn-auto-" + cvid} />
                <User onClick={this.onManualClick} id={"btn-manual-" + cvid} />
                <UncontrolledTooltip placement="top" target={"btn-auto-" + cvid}>
                    Automatic Search
                </UncontrolledTooltip>
                <UncontrolledTooltip placement="top" target={"btn-manual-" + cvid}>
                    Manual Search
                </UncontrolledTooltip>
            </>
        );
    }
}

IssueSearchButtons.propTypes = {
    cvid: PropTypes.number.isRequired,
    clickCallback: PropTypes.func.isRequired,
}

export default IssueSearchButtons

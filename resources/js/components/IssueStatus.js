import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AlertTriangle } from 'react-feather'
import {UncontrolledTooltip} from 'reactstrap'

class IssueStatus extends Component
{
    renderMissing() {
        let id = "status-" + this.props.cvid;
        return (
            <>
                <AlertTriangle id={id} />
                <UncontrolledTooltip placement="top" target={id}>
                    Issue missing from disk
                </UncontrolledTooltip>
            </>
        )
    }

    renderDownloaded() {
        let id = "status-" + this.props.cvid;
        return (
            <>
                <span id={id}>Downloaded</span>
                <UncontrolledTooltip placement="top" target={id}>
                    Issue Downloaded 
                </UncontrolledTooltip>
            </>
        );
    }

    render() {
        switch(this.props.status) {
            case null:
            case 'missing':
                return this.renderMissing();
            case 'downloaded':
                return this.renderDownloaded();
            default:
                return ("Unknown...");
        }
    }
}

IssueStatus.propTypes = {
    cvid: PropTypes.number.isRequired,
    status: PropTypes.string
}

export default IssueStatus

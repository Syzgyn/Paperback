import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { File, AlertTriangle, DownloadCloud } from 'react-feather'
import {UncontrolledTooltip} from 'reactstrap'

class IssueStatus extends Component
{
    renderMissing() {
        let id = "status-" + this.props.issue.cvid;
        return (
            <>
                <AlertTriangle id={id} />
                <UncontrolledTooltip placement="top" target={id}>
                    Issue missing from disk
                </UncontrolledTooltip>
            </>
        )
    }

    renderDownloading() {
        let id = 'status-' + this.props.issue.cvid;
        return (
            <>
                <DownloadCloud id={id} />
                <UncontrolledTooltip placement="top" target={id}>
                    Downloading (Replace with Status bar)
                </UncontrolledTooltip>
            </>
        );
    }

    renderDownloaded() {
        let id = "status-" + this.props.issue.cvid;
        return (
            <>
                <File id={id} />
                <UncontrolledTooltip placement="top" target={id}>
                    Issue Downloaded - {this.props.issue.downloadedFile.readable_size}
                </UncontrolledTooltip>
            </>
        );
    }

    render() {
        switch(this.props.issue.status) {
            case null:
            case 'missing':
                return this.renderMissing();
            case 'downloading':
                return this.renderDownloading();
            case 'downloaded':
                return this.renderDownloaded();
            default:
                return ("Unknown...");
        }
    }
}

IssueStatus.propTypes = {
    issue: PropTypes.shape({
        cvid: PropTypes.number.isRequired,
        downloadedFile: PropTypes.shape({
            readable_size: PropTypes.number,
        }),
        status: PropTypes.string,
    }).isRequired,
}

export default IssueStatus

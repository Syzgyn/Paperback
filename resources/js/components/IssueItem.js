import React, { Component } from 'react'
import { Button } from 'reactstrap'
import IssueStatus from './IssueStatus'
import IssueSearchButtons from './IssueSearchButtons'

class IssueItem extends Component
{
    constructor() {
        super()
        this.clickName = this.clickName.bind(this);
    }

    clickName() {
        this.props.clickCallback(this.props.issue);
    }

    render() {
        const {
            issue_num,
            displayName,
            status,
            release_date,
            cvid,
        } = this.props.issue;
        return (
            <tr>
                <td className="issue-number-cell">{issue_num}</td>
                <td className="issue-name-cell"><a href="#" onClick={this.clickName}>{displayName}</a></td>
                <td className="issue-release-date-cell">{release_date}</td>
                <td className="issue-status-cell"><IssueStatus status={status} cvid={cvid}/></td>
                <td className="issue-search-cell"><IssueSearchButtons cvid={cvid} /></td> 
            </tr>
        );
    }
}

export default IssueItem

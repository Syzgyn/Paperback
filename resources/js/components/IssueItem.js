import React, { Component } from 'react'

class IssueItem extends Component
{
    render() {
        const {
            issue_num,
            displayName,
            release_date,
        } = this.props;
        return (
            <tr>
                <td className="issue-number-cell">{issue_num}</td>
                <td className="issue-name-cell">{displayName}</td>
                <td className="issue-release-date-cell">{release_date}</td>
            </tr>
        );
    }
}

export default IssueItem

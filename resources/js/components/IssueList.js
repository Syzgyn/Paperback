import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IssueItem from './IssueItem'

class IssueList extends Component
{
    render() {
        const {issues} = this.props;

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Release Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {issues.map(issue => (
                        <IssueItem key={issue.cvid} clickCallback={this.props.clickCallback} issue={issue}/> 
                    ))}
                </tbody>
            </table>
        );
    }
}

IssueList.propTypes = {
    issues: PropTypes.array,
    clickCallback: PropTypes.func,
}

export default IssueList


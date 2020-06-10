import React, { Component } from 'react'
import IssueItem from './IssueItem'

class IssueList extends Component
{
    render() {
        const {issues} = this.props;
        console.log(this.props);

        return (
            <table class="table">
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
                        <IssueItem key={issue.cvid} {...issue}/> 
                    ))}
                </tbody>
            </table>
        );
    }
}

export default IssueList


import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IssueItem from './IssueItem'
import LoadingIndicator from '@/Components/Loading/LoadingIndicator'

class IssueList extends Component
{
    render() {
        const {issues, comicMonitored} = this.props;
        const {isLoading, isPopulated, items} = issues;

        if (isLoading) {
            return <LoadingIndicator />
        }

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>#</th>
                        <th>Name</th>
                        <th>Release Date</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(issue => (
                        <IssueItem key={issue.cvid} comicMonitored={comicMonitored} clickCallback={this.props.clickCallback} issue={issue}/> 
                    ))}
                </tbody>
            </table>
        );
    }
}

IssueList.propTypes = {
    issues: PropTypes.shape({
        isLoading: PropTypes.bool,
        isPopulated: PropTypes.bool,
        items: PropTypes.array,
    }),
    clickCallback: PropTypes.func,
}

export default IssueList


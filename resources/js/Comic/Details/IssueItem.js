import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IssueStatus from './IssueStatus'
import IssueSearchButtons from './IssueSearchButtons'
import MonitoredIcon from '@/Components/MonitoredIcon'
import IssueModal from './IssueModal/IssueModal';

class IssueItem extends Component
{
    constructor() {
        super()
        this.state = {
            modal: false,
            modalTab: 'description',
        };
        this.clickName = this.clickName.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.changeModalTab = this.changeModalTab.bind(this);
    }

    toggleModal() {
        this.setState({modal: !this.state.modal});//, modalTab: tab});
    }

    changeModalTab(tab) {
        this.setState({modalTab: tab});
    }

    clickName() {
        this.changeModalTab('description');
        this.toggleModal();
    }

    onSearchClick(type) {
        this.changeModalTab('search');
        this.toggleModal();
    }

    render() {
        const {
            issue,
        } = this.props;

        const {
            issue_num,
            display_name,
            release_date,
            cvid,
            monitored,
        } = issue;
        console.log("II", this.state);

        return (
            <tr>
                <td className="issue-monitor-cell"><MonitoredIcon itemType='issue' cvid={cvid} isMonitored={monitored} /></td>
                <td className="issue-number-cell">{issue_num}</td>
                <td className="issue-name-cell"><span className="btn-link cursor-pointer" onClick={this.clickName}>{display_name}</span></td>
                <td className="issue-release-date-cell">{release_date}</td>
                <td className="issue-status-cell"><IssueStatus issue={issue} /></td>
                <td className="issue-search-cell"><IssueSearchButtons cvid={cvid} clickCallback={this.onSearchClick}/></td> 
                <IssueModal isOpen={this.state.modal} issue={issue} toggleModal={this.toggleModal} activeTab={this.state.modalTab} changeActiveTab={this.changeModalTab} />
            </tr>
        );
    }
}

IssueItem.propTypes = {
    issue: PropTypes.shape({
        issue_num: PropTypes.number,
        displayName: PropTypes.string,
        status: PropTypes.string,
        release_date: PropTypes.string,
        cvid: PropTypes.number,
    }),
    clickCallback: PropTypes.func,
}

export default IssueItem

import React from 'react'
import PropTypes from 'prop-types'
import PageRow from '@/Components/Page/PageRow'

function IssueModalMenuBar(props) {
    const links = [
        {
            text: 'Description',
            tabName: 'description',
        },
        {
            text: 'History',
            tabName: 'history',
        },
        {
            text: 'Search',
            tabName: 'search',
        },
    ];

    const {activeTab, onClickCallback} = props;

    return (
        <PageRow className="mb-3">
            <ul className="nav nav-tabs" role="tablist">
                {links.map((link, index) =>
                    <li key={index} className="nav-item">
                        <a href="#" data-tabname={link.tabName} onClick={onClickCallback} className={"nav-link" + (link.tabName === activeTab ? " active" : "")}>{link.text}</a>
                    </li>
                )}
            </ul>
        </PageRow>
    );
}

IssueModalMenuBar.propTypes = {
    activeTab: PropTypes.string,
    onClickCallback: PropTypes.func.isRequired,
}

export default IssueModalMenuBar;


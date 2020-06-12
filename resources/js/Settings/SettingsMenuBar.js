import React from 'react'
import { NavLink } from 'react-router-dom'
import PageRow from '@/Components/Page/PageRow'

function SettingsMenuBar() {
    const links = [
        {
            to: '/settings/indexers',
            text: 'Indexers',
        },
        {
            to: '/settings/downloaders',
            text: 'Download Clients',
        },
    ];

    return (
        <PageRow className="mb-3">
            <ul className="nav nav-tabs">
                {links.map((link, index) =>
                    <li key={index} className="nav-item">
                        <NavLink to={link.to} className="nav-link">{link.text}</NavLink>
                    </li>
                )}
            </ul>
        </PageRow>
    );
}

SettingsMenuBar.propTypes = {}

export default SettingsMenuBar;

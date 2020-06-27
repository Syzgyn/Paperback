import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {DownloadCloud} from 'react-feather'
import {UncontrolledTooltip} from 'reactstrap'

class HistoryIcon extends Component
{
    render()
    {
        const {
            event_type,
            id,
            data
        } = this.props;


        switch (event_type)
        {
            case 1: //Download started
                const {
                    indexer,
                } = data;

                return (
                    <>
                        <DownloadCloud id={'history-icon-' + id}/>
                        <UncontrolledTooltip placement='right' target={'history-icon-' + id}>
                            Issue Grabbed from {indexer} and sent to download client
                        </UncontrolledTooltip>
                    </>
                );
                
        }
    }
}

HistoryIcon.propTypes = {
    event_type: PropTypes.number,
}

export default HistoryIcon

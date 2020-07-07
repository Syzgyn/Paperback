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

        const {
            indexer,
        } = data;

        switch (event_type)
        {
            case 1: //Download started
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
    id: PropTypes.number,
    data: PropTypes.shape({
        indexer: PropTypes.string,
    }),
}

export default HistoryIcon

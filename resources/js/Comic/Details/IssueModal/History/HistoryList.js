import React, { Component } from 'react'
import HistoryItem from './HistoryItem'
import PropTypes from 'prop-types'

class HistoryList extends Component
{
    render() {
        const {items} = this.props;

        return (
            <div className='table-responsive'>
                <table className='table table-sm history-table'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Source Title</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {items.map(item=> (
                        <HistoryItem key={item.id} item={item} />
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

HistoryList.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number,
    }),
}

export default HistoryList

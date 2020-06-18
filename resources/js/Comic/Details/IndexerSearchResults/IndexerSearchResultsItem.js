import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Download} from 'react-feather'

class IndexerSearchResultsItem extends Component
{
    render() {
        const {
            displayTitle,
            ago,
            size,
            indexer,
            source,
        } = this.props.item;

        return (
            <tr>
                <td className="">{source}</td>
                <td className="">{ago}</td>
                <td className="">{displayTitle}</td>
                <td className="">{indexer}</td>
                <td className="">{size}</td>
                <td className=""><Download /></td>
            </tr>
        );
    }
}

IndexerSearchResultsItem.propTypes = {
    item: PropTypes.shape({
        displayTitle: PropTypes.string,
        ago: PropTypes.string,
        size: PropTypes.string,
        indexer: PropTypes.string,
        source: PropTypes.string,
    }),
}

export default IndexerSearchResultsItem

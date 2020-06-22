import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import {Download} from 'react-feather'

class IndexerSearchResultsItem extends Component
{
    constructor() {
        super();

        this.onDownloadClick = this.onDownloadClick.bind(this);
    }

    onDownloadClick() {
        axios.post('/api/downloader/download', {link: this.props.item.link})
            .then(this.props.toggleModal());
    }

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
                <td className=""><Download onClick={this.onDownloadClick} /></td>
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

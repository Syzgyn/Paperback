import React, { Component } from "react";
import PropTypes from "prop-types";
import { Download } from "react-feather";

class IndexerSearchResultsItem extends Component {
    constructor() {
        super();

        this.onDownloadClick = this.onDownloadClick.bind(this);
    }

    onDownloadClick() {
        this.props.downloadClick(this.props.item);
    }

    render() {
        const { displayTitle, ago, size, indexer, source } = this.props.item;

        return (
            <tr>
                <td className="">{source}</td>
                <td className="">{ago}</td>
                <td className="">{displayTitle}</td>
                <td className="">{indexer}</td>
                <td className="">{size}</td>
                <td className="">
                    <Download onClick={this.onDownloadClick} />
                </td>
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
        link: PropTypes.string,
        guid: PropTypes.string,
    }),
    downloadClick: PropTypes.func.isRequired,
};

export default IndexerSearchResultsItem;

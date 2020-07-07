import React, { Component } from "react";
import PropTypes from "prop-types";
import IndexerSearchResultsItem from "./IndexerSearchResultsItem";

class IndexerSearchResultsList extends Component {
    render() {
        const { results } = this.props;

        if (results.length == 0) {
            return "No results found";
        }

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Source</th>
                        <th>Age</th>
                        <th>Title</th>
                        <th>Indexer</th>
                        <th>Size</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result, index) => (
                        <IndexerSearchResultsItem
                            key={index}
                            item={result}
                            downloadClick={this.props.downloadClick}
                        />
                    ))}
                </tbody>
            </table>
        );
    }
}

IndexerSearchResultsList.propTypes = {
    results: PropTypes.array,
    downloadClick: PropTypes.func.isRequired,
};

export default IndexerSearchResultsList;

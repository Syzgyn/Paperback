import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Card, CardTitle} from 'reactstrap'

class IndexerAddModalItem extends Component
{
    constructor() {
        super();
        
        this.selectIndexer = this.selectIndexer.bind(this);
    }

    selectIndexer() {
        this.props.onIndexerSelect(this.props.type);
    }

    render() {
        const {
            name,
        } = this.props;

        return (
            <Card onClick={this.selectIndexer} className="indexer-item shadow p-3 m-3">
                <CardTitle>{name}</CardTitle>
            </Card>
        );
    }
}

IndexerAddModalItem.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    onIndexerSelect: PropTypes.func.isRequired,
}

export default IndexerAddModalItem

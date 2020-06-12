import React from 'react'
import PropTypes from 'prop-types'
import {Card, CardTitle} from 'reactstrap'

function IndexerAddModalItem(props) {
    const {
        name,
        onIndexerSelect,
    } = props;


    return (
        <Card onClick={onIndexerSelect} className="indexer-item shadow p-3 m-3">
            <CardTitle>{name}</CardTitle>
        </Card>
    );
}

IndexerAddModalItem.propTypes = {
    name: PropTypes.string,
    onIndexerSelect: PropTypes.func.isRequired,
}

export default IndexerAddModalItem

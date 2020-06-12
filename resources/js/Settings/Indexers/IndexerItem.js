import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Card, CardTitle, CardText} from 'reactstrap'

class IndexerItem extends Component
{
    constructor() {
        super();
        this.state = {
            editModal: false,
        }
    }

    render() {
        const {
            name,
        } = this.props.indexer;

        return (
            <Card className="indexer-item">
                <CardTitle>{name}</CardTitle>
                <CardText>Info here</CardText>
            </Card>
        );
    }
}

IndexerItem.propTypes = {
    indexer: PropTypes.object.isRequired,
}

export default IndexerItem

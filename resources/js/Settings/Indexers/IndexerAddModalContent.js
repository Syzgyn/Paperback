import React, {Component} from 'react'
import PropTypes from 'prop-types'
import IndexerAddModalItem from './IndexerAddModalItem';

class IndexerAddModalContent extends Component {
    constructor() {
        super();
        this.onIndexerSelect = this.onIndexerSelect.bind(this);
    }

    onIndexerSelect(implementation) {
        //TODO: push selected implementation up
        console.log(implementation);
        this.props.onModalClose(true);
    }

    render() {
        const {
            schema,
        } = this.props;

        return (
            <>
                <h2>Newznab</h2>
                <div className="indexer-list">
                    {schema
                        .filter(indexer => {return indexer.protocol == "usenet"})
                        .map(indexer => 
                            <IndexerAddModalItem key={indexer.name} {...indexer} onIndexerSelect={this.onIndexerSelect} />
                    )}
                </div>
            </>
        );
    }
}

IndexerAddModalContent.propTypes = {
    schema: PropTypes.array.isRequired,
    onModalClose: PropTypes.func.isRequired,
}

export default IndexerAddModalContent

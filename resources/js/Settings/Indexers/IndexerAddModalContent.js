import React, {Component} from 'react'
import PropTypes from 'prop-types'
import IndexerAddModalItem from './IndexerAddModalItem';

class IndexerAddModalContent extends Component {
    constructor() {
        super();
        this.onIndexerSelect = this.onIndexerSelect.bind(this);
    }

    onIndexerSelect(modelType) {
        this.props.onModalClose(true, modelType);
    }

    render() {
        const {
            schema,
        } = this.props;

        return (
            <>
                <h2>Usenet</h2>
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

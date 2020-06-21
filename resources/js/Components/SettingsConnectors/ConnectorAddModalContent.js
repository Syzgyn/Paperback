import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ConnectorAddModalItem from './ConnectorAddModalItem';

class ConnectorAddModalContent extends Component {
    constructor() {
        super();
        this.onConnectorSelect = this.onConnectorSelect.bind(this);
    }

    onConnectorSelect(modelType) {
        this.props.onModalClose(true, modelType);
    }

    render() {
        const {
            schema,
        } = this.props;

        return (
            <>
                <h2>Usenet</h2>
                <div className="settings-item-list">
                    {schema
                        .filter(item => {return item.protocol == "usenet"})
                        .map(item => 
                            <ConnectorAddModalItem key={item.name} {...item} onConnectorSelect={this.onConnectorSelect} />
                    )}
                </div>
            </>
        );
    }
}

ConnectorAddModalContent.propTypes = {
    schema: PropTypes.array.isRequired,
    onModalClose: PropTypes.func.isRequired,
}

export default ConnectorAddModalContent

import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import PageRow from "@/Components/Page/PageRow";
import LoadingIndicator from "@/Components/Loading/LoadingIndicator";
import ConnectorItem from "./ConnectorItem";
import ConnectorEmptyItem from "./ConnectorEmptyItem";

class ConnectorList extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
            loading: true,
        };

        this.getItems = this.getItems.bind(this);
    }

    componentDidMount() {
        this.getItems();
    }

    getItems() {
        setTimeout(() => {
            axios.get(this.props.url).then((response) => {
                this.setState({ items: response.data.data, loading: false });
            });
        }, 100);
    }

    render() {
        if (this.state.loading) {
            return <LoadingIndicator />;
        }

        return (
            <PageRow className="settings-connector-list">
                {this.state.items.map((item) => (
                    <ConnectorItem
                        key={item.id}
                        item={item}
                        refreshCallback={this.getItems}
                        url={this.props.url}
                    />
                ))}
                <ConnectorEmptyItem
                    refreshCallback={this.getItems}
                    url={this.props.url}
                />
            </PageRow>
        );
    }
}

ConnectorList.propTypes = {
    url: PropTypes.string.isRequired,
};

export default ConnectorList;

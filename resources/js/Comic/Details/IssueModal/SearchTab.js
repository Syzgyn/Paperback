import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Button} from 'reactstrap';
import axios from 'axios'
import PageRow from '@/Components/Page/PageRow'
import IndexerSearchResultsList from '@/Comic/Details/IndexerSearchResults/IndexerSearchResultsList'

class SearchTab extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            triggerEvent: this.props.triggerEvent,
            results: [],
        };

        this.onManualClick = this.onManualClick.bind(this);
        this.onAutomaticClick = this.onAutomaticClick.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.triggerEvent !== this.props.triggerEvent) {
            this.setState({triggerEvent: this.props.triggerEvent});
        }
    }

    onManualClick() {
        axios.get('/api/indexer/search', {params:{cvid: this.props.cvid}})
            .then(response => {
                this.setState({results: response.data.data, triggerEvent: "manual"});
            });
    }

    onAutomaticClick() {
        this.setState({triggerEvent: "automatic"});
    }

    defaultButtons() {
        return (
            <>
                <Button onClick={this.onAutomaticClick} color="secondary">Automatic Search</Button>
                <Button onClick={this.onManualClick} color="primary">Manual Search</Button>
            </>
        )
    }

    results() {
        const {results} = this.state;
        
        return <IndexerSearchResultsList results={results} />
    }

    render()
    {
        const {triggerEvent} = this.state;

        return (
            <PageRow>
                {! triggerEvent ? this.defaultButtons() : this.results() }
            </PageRow>
        );
    }
}

export default SearchTab

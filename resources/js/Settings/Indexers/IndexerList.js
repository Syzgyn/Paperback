import React, {Component} from 'react'
import axios from 'axios'
import PageRow from '@/Components/Page/PageRow'
import LoadingIndicator from '@/Components/Loading/LoadingIndicator'
import IndexerItem from './IndexerItem'
import IndexerEmptyItem from './IndexerEmptyItem'

class IndexerList extends Component
{
    constructor() {
        super()
        this.state = {
            indexers: [],
            loading: true,
        }

        this.getIndexers = this.getIndexers.bind(this);
    }

    componentDidMount() {
        this.getIndexers();
    }

    getIndexers() {
        axios.get('/api/indexer')
        .then(response => {
            this.setState({indexers: response.data.data, loading: false});
        });
    }

    render() {
        if (this.state.loading) {
            return <LoadingIndicator />
        }

        return (
            <PageRow className="indexers-list">
                {this.state.indexers.map(indexer => 
                    <IndexerItem key={indexer.id} indexer={indexer} refreshCallback={this.getIndexers}/>
                )}
                    <IndexerEmptyItem refreshCallback={this.getIndexers}/> 
            </PageRow>
        );
    }
}

export default IndexerList

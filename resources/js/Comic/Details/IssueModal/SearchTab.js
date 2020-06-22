import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Button} from 'reactstrap';
import PageRow from '@/Components/Page/PageRow'
import IndexerSearchResultsList from '@/Comic/Details/IndexerSearchResults/IndexerSearchResultsList'
import LoadingIndicator from '@/Components/Loading/LoadingIndicator'

class SearchTab extends Component
{
    defaultButtons() {
        return (
            <>
                <Button onClick={this.props.automaticClick} color="secondary">Automatic Search</Button>
                <Button onClick={this.props.manualClick} color="primary">Manual Search</Button>
            </>
        )
    }

    results() {
        const {results} = this.props;
        
        return <IndexerSearchResultsList results={results} toggleModal={this.props.toggleModal} />
    }

    render()
    {
        if (this.props.loading) {
            return <LoadingIndicator />
        }

        return (
            <PageRow>
                {this.props.didSearch ? this.results() : this.defaultButtons()}
            </PageRow>
        );
    }
}

SearchTab.propTypes = {
    automaticClick: PropTypes.func.isRequired,
    manualClick: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    results: PropTypes.array,
    didSearch: PropTypes.bool,
}

export default SearchTab

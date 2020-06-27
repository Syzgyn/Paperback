import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import PageRow from '@/Components/Page/PageRow'
import HistoryList from './HistoryList'

class HistoryTab extends Component
{
    constructor()
    {
        super();
        this.state = {
            history: [],
        }
    }

    componentDidMount()
    {
        axios.get('/api/history/issue/' + this.props.issue.cvid)
            .then(results => {
                this.setState({history: results.data.data});
            });
    }

    render()
    {
        const {history} = this.state;

        return (
            <PageRow>
                <HistoryList items={history} />
            </PageRow>
        );
    }
}

HistoryTab.propTypes = {
    issue: PropTypes.shape({
        cvid: PropTypes.number,
    }),
}

export default HistoryTab 

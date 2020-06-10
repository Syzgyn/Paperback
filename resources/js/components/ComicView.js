import React, { Component } from 'react'
import { Link, useParams, withRouter } from 'react-router-dom'
import axios from 'axios'
import ComicItemTemplate from './ComicItemTemplate';
import IssueList from './IssueList';

class ComicView extends Component
{
    constructor() {
        super();
        this.state = {
            comic: null,
            loading: true,
        }
    }
    
    componentDidMount() {
        axios.get('/api/comic/' + this.props.match.params.cvid)
        .then(response => {
            this.setState({comic: response.data.data, loading: false});
        });
    }

    render() {
        const {comic, loading} = this.state;
        
        if (loading) {
            return(<span>Loading...</span>);
        }

        if (comic) {
            const issues = comic.issues;

            return (
                <>
                    <ComicItemTemplate singleView="true" classes="pb-3" {...comic} /> 
                    <IssueList issues={issues} />
                </>
            );
        }

        return ("Something went wrong...")
    }
}

export default withRouter(ComicView)

import React, { Component } from 'react'
import { Link, useParams, withRouter } from 'react-router-dom'
import axios from 'axios'
import ComicItemTemplate from './ComicItemTemplate';
import IssueList from './IssueList';
import IssueModal from './IssueModal';

class ComicView extends Component
{
    constructor() {
        super();
        this.state = {
            comic: null,
            loading: true,
            modal: false,
        }

        this.toggleModal = this.toggleModal.bind(this);
    }
    
    componentDidMount() {
        axios.get('/api/comic/' + this.props.match.params.cvid)
        .then(response => {
            this.setState({comic: response.data.data, loading: false});
        });
    }

    toggleModal(issue) {
        console.log(issue);
        this.setState({modal: !this.state.modal, issue: issue}, () => {console.log(this.state)})
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
                    <IssueList issues={issues} clickCallback={this.toggleModal}/>
                    <IssueModal isOpen={this.state.modal} issue={this.state.issue} toggleModal={this.toggleModal} />
                </>
            );
        }

        return ("Something went wrong...")
    }
}

export default withRouter(ComicView)

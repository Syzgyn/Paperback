import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import ComicItem from './ComicItem'
import IssueList from './IssueList';
import IssueModal from './IssueModal';

class ComicDetails extends Component
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
        this.setState({modal: !this.state.modal, issue: issue});
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
                    <ComicItem singleView={true} classes="pb-3" {...comic} /> 
                    <IssueList issues={issues} clickCallback={this.toggleModal}/>
                    <IssueModal isOpen={this.state.modal} issue={this.state.issue} toggleModal={this.toggleModal} />
                </>
            );
        }

        return ("Something went wrong...")
    }
}

ComicDetails.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            cvid: PropTypes.string,
        }),
    }),
}

export default withRouter(ComicDetails)

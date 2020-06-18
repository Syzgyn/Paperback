import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import ComicItem from './ComicItem'
import IssueList from './IssueList';
import IssueModal from './IssueModal/IssueModal';
import LoadingIndicator from '@/Components/Loading/LoadingIndicator';

class ComicDetails extends Component
{
    constructor() {
        super();
        this.state = {
            comic: null,
            loading: true,
            modal: false,
            activeTab: "description",
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.changeModalTab = this.changeModalTab.bind(this);
    }
    
    componentDidMount() {
        axios.get('/api/comic/' + this.props.match.params.cvid)
        .then(response => {
            this.setState({comic: response.data.data, loading: false});
        });
    }

    toggleModal(issue, tab="description") {
        console.log("toggleModal", tab);
        this.setState({modal: !this.state.modal, issue: issue, activeTab: tab});
    }

    changeModalTab(tab) {
        this.setState({activeTab: tab});
    }

    render() {
        const {comic, loading, activeTab, triggerEvent} = this.state;
        
        if (loading) {
            return(<LoadingIndicator />);
        }

        if (comic) {
            const issues = comic.issues;

            //TODO:  This works for now, but later convert to more like Sonarr
            return (
                <>
                    <ComicItem classes="pb-3" {...comic} /> 
                    <IssueList issues={issues} clickCallback={this.toggleModal}/>
                    <IssueModal isOpen={this.state.modal} issue={this.state.issue} toggleModal={this.toggleModal} activeTab={activeTab} changeTab={this.changeModalTab} />
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

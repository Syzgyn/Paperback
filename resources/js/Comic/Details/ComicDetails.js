import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import ComicItem from './ComicItem'
import IssueList from './IssueList';
import IssueModal from './IssueModal/IssueModal';
import LoadingIndicator from '@/Components/Loading/LoadingIndicator';
import { useDispatch, useSelector } from 'react-redux'
import {fetchComics, currentComicSelector} from '@/Store/Slices/comics'

const ComicDetails = ({match}) => { 

    function toggleModal(issue, tab="description") {
        if (tab == "searchAutomatic") {
            axios.get('/api/indexer/autosearch', {params:{ cvid: issue.cvid}})
                .then(response => {
                    console.log(response);
                });
        } else {
            this.setState({modal: !this.state.modal, issue: issue, activeTab: tab});
        }
    }

    function changeModalTab(tab) {
        this.setState({activeTab: tab});
    }

    const comic = useSelector(currentComicSelector)
    
    if (comic) {
        const issues = comic.issues;

        //TODO:  This works for now, but later convert to more like Sonarr
        return (
            <>
                <ComicItem classes="pb-3" {...comic} /> 
                <IssueList issues={issues} clickCallback={toggleModal}/>
            </>
        );
    }

    return ("Something went wrong...")
}

ComicDetails.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            cvid: PropTypes.string,
        }),
    }),
}

export default withRouter(ComicDetails)

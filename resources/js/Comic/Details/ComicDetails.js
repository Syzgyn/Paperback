import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import axios from "axios";
import ComicItem from "./ComicItem";
import IssueList from "./IssueList";
import LoadingIndicator from "@/Components/Loading/LoadingIndicator";
import { useDispatch, useSelector } from "react-redux";
import { comicsSelector, currentComicSelector } from "@/Store/Slices/comics";
import {
    fetchIssues,
    removeIssues,
    issuesSelector,
} from "@/Store/Slices/issues";

const ComicDetails = ({ match }) => {
    function toggleModal(issue, tab = "description") {
        if (tab == "searchAutomatic") {
            axios
                .get("/api/indexer/autosearch", {
                    params: { cvid: issue.cvid },
                })
                .then((response) => {
                    console.log(response);
                });
        } else {
            this.setState({
                modal: !this.state.modal,
                issue: issue,
                activeTab: tab,
            });
        }
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchIssues(match.params.cvid));

        return function cleanup() {
            dispatch(removeIssues());
        };
    }, [dispatch, match.params.cvid]);

    const comics = useSelector(comicsSelector);
    const issues = useSelector(issuesSelector);
    const comic = useSelector(currentComicSelector);

    if (comics.isLoading) {
        return <LoadingIndicator />;
    }

    if (comics.isPopulated) {
        //TODO:  This works for now, but later convert to more like Sonarr
        return (
            <>
                <ComicItem classes="pb-3" {...comic} />
                <IssueList
                    issues={issues}
                    comicMonitored={comic.monitored}
                    clickCallback={toggleModal}
                />
            </>
        );
    }

    return "Something went wrong...";
};

ComicDetails.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            cvid: PropTypes.string,
        }),
    }),
};

export default withRouter(ComicDetails);

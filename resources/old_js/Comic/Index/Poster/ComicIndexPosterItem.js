import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import DOMPurify from "dompurify";
import Pluralize from "react-pluralize";
import ComicBadge from "@/Components/ComicBadge";
import IssueCountBar from "@/Comic/Index/IssueCountBar";
import ComicSettings from "@/Comic/Details/ComicSettings";
import { Card, CardTitle, CardText } from "reactstrap";

class ComicIndexPosterItem extends Component {
    render() {
        const {
            cvid,
            numIssues,
            downloadedIssues,
            startYear,
            image,
            name,
            displayDescription,
            classes,
        } = this.props;

        return (
            <Card className="shadow p-2 m-2 comic-poster-item">
                <Link to={"/comic/" + cvid} className="hideLink">
                    <div className="comic-poster-item-image">
                        <img className="cover-image" src={image} />
                    </div>
                </Link>
                <IssueCountBar
                    count={downloadedIssues}
                    total={numIssues}
                    className="issue-progress-poster mb-0"
                />
            </Card>
        );
    }
}

ComicIndexPosterItem.propTypes = {
    cvid: PropTypes.number,
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
    numIssues: PropTypes.number,
    downloadedIssues: PropTypes.number,
    startYear: PropTypes.number,
    publisher: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    displayDescription: PropTypes.string,
    inLibrary: PropTypes.bool,
    singleView: PropTypes.bool,
    classes: PropTypes.string,
};

export default withRouter(ComicIndexPosterItem);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import DOMPurify from "dompurify";
import Pluralize from "react-pluralize";
import ComicBadge from "@/Components/ComicBadge";
import IssueCountBar from "@/Comic/Index/IssueCountBar";
import ComicSettings from "@/Comic/Details/ComicSettings";

class ComicIndexOverviewItem extends Component {
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
            <div className={"comic-item row pb-5 " + classes}>
                <div className="col-md-2 col-sm-3">
                    <Link to={"/comic/" + cvid} className="hideLink">
                        <img className="cover-image" src={image} />
                    </Link>
                </div>
                <div className="col-md-10 col-sm-9">
                    <div className="row">
                        <div className="col-12 pb-1">
                            <Link to={"/comic/" + cvid} className="hideLink">
                                <span className="h2 mr-2">
                                    {name}{" "}
                                    <span className="comic-year">
                                        ({startYear})
                                    </span>
                                </span>
                            </Link>
                            <span className="float-right">
                                <ComicSettings cvid={cvid} />
                            </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Link to={"/comic/" + cvid} className="hideLink">
                                <div
                                    className="comic-description"
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(
                                            displayDescription,
                                            { ADD_ATTR: ["target"] }
                                        ),
                                    }}
                                ></div>
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <ComicBadge>
                                <Pluralize
                                    singular={"issue"}
                                    count={numIssues}
                                />
                            </ComicBadge>
                        </div>
                        <div className="col-md-2 offset-md-8">
                            <IssueCountBar
                                count={downloadedIssues}
                                total={numIssues}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ComicIndexOverviewItem.propTypes = {
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

export default withRouter(ComicIndexOverviewItem);

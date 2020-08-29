import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import DOMPurify from "dompurify";
import Pluralize from "react-pluralize";
import ComicBadge from "@/Components/ComicBadge";
import IssueCountBar from "@/Comic/Index/IssueCountBar";
import ComicSettings from "@/Comic/Details/ComicSettings";

class ComicIndexTableItem extends Component {
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
            <tr>
                <td>
                    <Link to={"/comic/" + cvid} className="hideLink">
                        {name}
                    </Link>
                </td>
                <td>
                    <IssueCountBar
                        count={downloadedIssues}
                        total={numIssues}
                    />
                </td>
                <td>
                    <ComicSettings cvid={cvid} />
                </td>
            </tr>
        );
    }
}

ComicIndexTableItem.propTypes = {
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

export default withRouter(ComicIndexTableItem);

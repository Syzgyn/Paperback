import React from "react";
import PropTypes from "prop-types";

const IssueCountBar = (props) => {
    const { count, total } = props;

    const percent = count / total;
    const color = count == total ? "primary" : "danger";
    const text = count + " / " + total;
    const style = {
        width: percent * 100 + "%",
    };

    return (
        <div className="issue-progress">
            <span className="progressbar-back-text">{text}</span>
            <div
                className={"progress-bar bg-" + color}
                style={style}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
            >
                <span className="progressbar-front-text">{text}</span>
            </div>
        </div>
    );
};

IssueCountBar.propTypes = {
    count: PropTypes.number,
    total: PropTypes.number,
};

export default IssueCountBar;

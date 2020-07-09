import React from "react";
import PropTypes from "prop-types";

const AddComicMessage = ({ name, cvid }) => {
    return (
        <div>
            <div>Added: {name}</div>
            <div>
                <a className="btn btn-secondary" href={"/comic/" + cvid}>
                    Go To Comic
                </a>
            </div>
        </div>
    );
};

AddComicMessage.propTypes = {
    cvid: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
};

export default AddComicMessage;

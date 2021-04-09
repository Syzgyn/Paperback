import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";

export const DocumentTitle = (props) => {
    const {title, children} = props;
    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {children}
        </>
    );
}

DocumentTitle.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
}

export default DocumentTitle;

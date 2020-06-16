import React from 'react'
import PropTypes from 'prop-types'

function PageRow(props) {
    const {
        className,
    } = props;

    return (
        <div className={"row " + className}>
            <div className="col-md-12">
                {props.children}
            </div>
        </div>
    );
}

PageRow.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
}

PageRow.defaultProps = {
    className: "",
}

export default PageRow

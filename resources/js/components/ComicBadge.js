import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ComicBadge extends Component
{
    render() {
        const content = this.props.children;
        const { variation } = this.props;
        return (
            <span className={"comic-badge badge badge-" + variation}>{content}</span>
        );
    }
}

ComicBadge.defaultProps = {
    variation: 'primary'
}

ComicBadge.propTypes = {
    children: PropTypes.string,
    variation: PropTypes.string,
}

export default ComicBadge;

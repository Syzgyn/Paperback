import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ComicBadge extends Component
{
    render() {
        const content = this.props.children;
        const { color } = this.props;
        return (
            <span className={"comic-badge mr-2 badge badge-" + color}>{content}</span>
        );
    }
}

ComicBadge.defaultProps = {
    color: 'primary'
}

ComicBadge.propTypes = {
    children: PropTypes.node,
    color: PropTypes.string,
}

export default ComicBadge;

import React, { Component } from 'react'

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

export default ComicBadge;

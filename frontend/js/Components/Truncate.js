import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser';
import TruncateMarkup from 'react-truncate-markup';
import styles from './Truncate.css';

const Truncate = (props) => {
  const removeLinks = (node, index) => {
    if (node.type === 'tag' && node.name === 'a') {
      node.name = 'span';
      return convertNodeToElement(node, index, removeLinks);
    }
  }

  const transform = props.removeLinks ? removeLinks : props.transform;

    return (
        <TruncateMarkup lines={props.lines}>
            <div className={styles.container}>
                { ReactHtmlParser(props.html, {transform}) }
            </div>
        </TruncateMarkup>
    );
};

Truncate.propTypes = {
    lines: PropTypes.number,
    html: PropTypes.string.isRequired,
    transform: PropTypes.func,
    removeLinks: PropTypes.bool,
}

Truncate.defaultProps = {
    lines: 2,
    transform: (node, index) => {},
}

export default Truncate

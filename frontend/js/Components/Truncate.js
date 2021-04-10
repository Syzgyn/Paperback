import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import TruncateMarkup from 'react-truncate-markup';
import styles from './Truncate.css';

const Truncate = (props) => {
    return (
        <TruncateMarkup lines={props.lines}>
            <div className={styles.container}>
                { ReactHtmlParser(props.html, {transform: props.transform}) }
            </div>
        </TruncateMarkup>
    );
};

Truncate.propTypes = {
    lines: PropTypes.number,
    html: PropTypes.string.isRequired,
    transform: PropTypes.func,
}

Truncate.defaultProps = {
    lines: 2,
    transform: (node, index) => {},
}

export default Truncate

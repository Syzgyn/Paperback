import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import TruncateMarkup from 'react-truncate-markup';
import styles from './Truncate.css';

const Truncate = (props) => (
    <TruncateMarkup lines={props.lines}>
        <div className={styles.container}>
            { ReactHtmlParser(props.html) }
        </div>
    </TruncateMarkup>
);

Truncate.propTypes = {
    lines: PropTypes.number,
    html: PropTypes.string.isRequired,
}

Truncate.defaultProps = {
    lines: 2,
}

export default Truncate

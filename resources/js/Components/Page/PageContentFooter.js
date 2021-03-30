import PropTypes from 'prop-types';
import React from 'react';
import styles from './PageContentFooter.module.scss';

const PageContentFooter = (props) => (
    <div className={props.className}>
        {props.children}
    </div>
);

PageContentFooter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

PageContentFooter.defaultProps = {
  className: styles.contentFooter
};

export default PageContentFooter;

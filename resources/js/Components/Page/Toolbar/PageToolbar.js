import PropTypes from 'prop-types';
import React  from 'react';
import styles from './PageToolbar.module.scss';

const PageToolbar = (props) => (
    <div className={props.className}>
        {props.children}
    </div>
);

PageToolbar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

PageToolbar.defaultProps = {
  className: styles.toolbar
};

export default PageToolbar;

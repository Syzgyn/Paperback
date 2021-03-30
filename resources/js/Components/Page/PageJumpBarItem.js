import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Link from '@/Components/Link/Link';
import styles from './PageJumpBarItem.module.scss';

const PageJumpBarItem = (props) => { 

  //
  // Listeners

  const onPress = () => {
    const {
      label,
      onItemPress
    } = props;

    props.onItemPress(label);
  }

  //
  // Render

    return (
        <Link
          className={styles.jumpBarItem}
          onPress={onPress}
        >
            {props.label.toUpperCase()}
        </Link>
    );
}

PageJumpBarItem.propTypes = {
  label: PropTypes.string.isRequired,
  onItemPress: PropTypes.func.isRequired
};

export default PageJumpBarItem;

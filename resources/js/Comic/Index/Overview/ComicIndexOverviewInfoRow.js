import PropTypes from 'prop-types';
import React from 'react';
import Icon from '@/Components/Icon';
import styles from './ComicIndexOverviewInfoRow.module.scss';

function ComicIndexOverviewInfoRow(props) {
  const {
    title,
    iconName,
    label
  } = props;

  return (
    <div
      className={styles.infoRow}
      title={title}
    >
      <Icon
        className={styles.icon}
        name={iconName}
        size={14}
      />

      {label}
    </div>
  );
}

ComicIndexOverviewInfoRow.propTypes = {
  title: PropTypes.string,
  iconName: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired
};

export default ComicIndexOverviewInfoRow;

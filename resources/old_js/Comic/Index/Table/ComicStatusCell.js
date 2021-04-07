import PropTypes from 'prop-types';
import React from 'react';
import { icons } from '@/Helpers/Props';
import Icon from '@/Components/Icon';
import VirtualTableRowCell from '@/Components/Table/Cells/TableRowCell';
import { getComicStatusDetails } from '@/Comic/ComicStatus';
import styles from './ComicStatusCell.module.scss';

function ComicStatusCell(props) {
  const {
    className,
    monitored,
    status,
    component: Component,
    ...otherProps
  } = props;

  const statusDetails = getComicStatusDetails(status);

  return (
    <Component
      className={className}
      {...otherProps}
    >
      <Icon
        className={styles.statusIcon}
        name={monitored ? icons.MONITORED : icons.UNMONITORED}
        title={monitored ? 'Comic is monitored' : 'Comic is unmonitored'}
      />

      <Icon
        className={styles.statusIcon}
        name={statusDetails.icon}
        title={`${statusDetails.title}: ${statusDetails.message}`}

      />
    </Component>
  );
}

ComicStatusCell.propTypes = {
  className: PropTypes.string.isRequired,
  monitored: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  component: PropTypes.elementType
};

ComicStatusCell.defaultProps = {
  className: styles.status,
  component: VirtualTableRowCell
};

export default ComicStatusCell;

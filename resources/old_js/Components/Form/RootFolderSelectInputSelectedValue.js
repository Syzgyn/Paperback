import PropTypes from 'prop-types';
import React from 'react';
import formatBytes from '@/Utilities/Number/formatBytes';
import EnhancedSelectInputSelectedValue from './EnhancedSelectInputSelectedValue';
import styles from './RootFolderSelectInputSelectedValue.module.scss';

function RootFolderSelectInputSelectedValue(props) {
  const {
    value,
    freeSpace,
    comicFolder,
    includeFreeSpace,
    isWindows,
    ...otherProps
  } = props;

  const slashCharacter = isWindows ? '\\' : '/';

  return (
    <EnhancedSelectInputSelectedValue
      className={styles.selectedValue}
      {...otherProps}
    >
      <div className={styles.pathContainer}>
        <div className={styles.path}>
          {value}
        </div>

        {
          comicFolder ?
            <div className={styles.comicFolder}>
              {slashCharacter}
              {comicFolder}
            </div> :
            null
        }
      </div>

      {
        freeSpace != null && includeFreeSpace &&
          <div className={styles.freeSpace}>
            {formatBytes(freeSpace)} Free
          </div>
      }
    </EnhancedSelectInputSelectedValue>
  );
}

RootFolderSelectInputSelectedValue.propTypes = {
  value: PropTypes.string,
  freeSpace: PropTypes.number,
  comicFolder: PropTypes.string,
  isWindows: PropTypes.bool,
  includeFreeSpace: PropTypes.bool.isRequired
};

RootFolderSelectInputSelectedValue.defaultProps = {
  includeFreeSpace: true
};

export default RootFolderSelectInputSelectedValue;

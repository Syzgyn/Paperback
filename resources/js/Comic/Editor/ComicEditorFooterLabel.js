import PropTypes from 'prop-types';
import React from 'react';
import { icons } from '@/Helpers/Props';
import SpinnerIcon from '@/Components/SpinnerIcon';
import styles from './ComicEditorFooterLabel.module.scss';

function ComicEditorFooterLabel(props) {
  const {
    className,
    label,
    isSaving
  } = props;

  return (
    <div className={className}>
      {label}

      {
        isSaving &&
          <SpinnerIcon
            className={styles.savingIcon}
            name={icons.SPINNER}
            isSpinning={true}
          />
      }
    </div>
  );
}

ComicEditorFooterLabel.propTypes = {
  className: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isSaving: PropTypes.bool.isRequired
};

ComicEditorFooterLabel.defaultProps = {
  className: styles.label
};

export default ComicEditorFooterLabel;

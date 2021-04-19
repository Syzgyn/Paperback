import PropTypes from 'prop-types';
import React from 'react';
import { kinds } from 'Helpers/Props';
import Label from 'Components/Label';
import styles from './ImportComicTitle.css';

function ImportComicTitle(props) {
  const {
    title,
    year,
    publisher,
    isExistingComic
  } = props;

  return (
    <div className={styles.titleContainer}>
      <div className={styles.title}>
        {title}
      </div>

      {
        !title.contains(year) &&
        year > 0 &&
          <span className={styles.year}>
            ({year})
          </span>
      }

      {
        !!publisher &&
          <Label>{publisher}</Label>
      }

      {
        isExistingComic &&
          <Label
            kind={kinds.WARNING}
          >
            Existing
          </Label>
      }
    </div>
  );
}

ImportComicTitle.propTypes = {
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  publisher: PropTypes.string,
  isExistingComic: PropTypes.bool.isRequired
};

export default ImportComicTitle;

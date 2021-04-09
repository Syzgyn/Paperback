import PropTypes from 'prop-types';
import React from 'react';
import { kinds } from 'Helpers/Props';
import Button from 'Components/Link/Button';
import styles from './NoComic.css';

function NoComic(props) {
  const { totalItems } = props;

  if (totalItems > 0) {
    return (
      <div>
        <div className={styles.message}>
          All comic are hidden due to the applied filter.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.message}>
        No comic found, to get started you'll want to import your existing comic or add a new comic.
      </div>

      <div className={styles.buttonContainer}>
        <Button
          to="/add/import"
          kind={kinds.PRIMARY}
        >
          Import Existing Comic
        </Button>
      </div>

      <div className={styles.buttonContainer}>
        <Button
          to="/add/new"
          kind={kinds.PRIMARY}
        >
          Add New Comic
        </Button>
      </div>
    </div>
  );
}

NoComic.propTypes = {
  totalItems: PropTypes.number.isRequired
};

export default NoComic;

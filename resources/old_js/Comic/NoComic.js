import PropTypes from 'prop-types';
import React from 'react';
import { kinds } from '@/Helpers/Props';
import Button from '@/Components/Link/Button';
import styles from './NoComic.module.scss';

function NoComic(props) {
  const { totalItems } = props;

  if (totalItems > 0) {
    return (
      <div>
        <div className={styles.message}>
          All comics are hidden due to the applied filter.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.message}>
        No comics found, to get started you'll want to import your existing comics or add a new comics.
      </div>

      <div className={styles.buttonContainer}>
        <Button
          to="/add/import"
          kind={kinds.PRIMARY}
        >
          Import Existing Comics
        </Button>
      </div>

      <div className={styles.buttonContainer}>
        <Button
          to="/add/new"
          kind={kinds.PRIMARY}
        >
          Add New Comics
        </Button>
      </div>
    </div>
  );
}

NoComic.propTypes = {
  totalItems: PropTypes.number.isRequired
};

export default NoComic;

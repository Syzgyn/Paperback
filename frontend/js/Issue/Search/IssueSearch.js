import PropTypes from 'prop-types';
import React from 'react';
import { icons, kinds, sizes } from 'Helpers/Props';
import Button from 'Components/Link/Button';
import Icon from 'Components/Icon';
import styles from './IssueSearch.css';

function IssueSearch(props) {
  const {
    onQuickSearchPress,
    onInteractiveSearchPress
  } = props;

  return (
    <div>
      <div className={styles.buttonContainer}>
        <Button
          className={styles.button}
          size={sizes.LARGE}
          onPress={onQuickSearchPress}
        >
          <Icon
            className={styles.buttonIcon}
            name={icons.QUICK}
          />

          Quick Search
        </Button>
      </div>

      <div className={styles.buttonContainer}>
        <Button
          className={styles.button}
          kind={kinds.PRIMARY}
          size={sizes.LARGE}
          onPress={onInteractiveSearchPress}
        >
          <Icon
            className={styles.buttonIcon}
            name={icons.INTERACTIVE}
          />

          Interactive Search
        </Button>
      </div>
    </div>
  );
}

IssueSearch.propTypes = {
  onQuickSearchPress: PropTypes.func.isRequired,
  onInteractiveSearchPress: PropTypes.func.isRequired
};

export default IssueSearch;

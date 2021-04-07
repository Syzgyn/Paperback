import PropTypes from 'prop-types';
import React from 'react';
import { kinds } from '@/Helpers/Props';
import TagInputTag from '@/Components/Form/TagInputTag';
import styles from './FilterBuilderRowValueTag.module.scss';

function FilterBuilderRowValueTag(props) {
  return (
    <div
      className={styles.tag}
    >
      <TagInputTag
        kind={kinds.DEFAULT}
        {...props}
      />

      {
        props.isLastTag ?
          null :
          <div className={styles.or}>
            or
          </div>
      }
    </div>
  );
}

FilterBuilderRowValueTag.propTypes = {
  isLastTag: PropTypes.bool.isRequired
};

export default FilterBuilderRowValueTag;

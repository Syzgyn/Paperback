import PropTypes from 'prop-types';
import React from 'react';
import * as comicTypes from '@/Utilities/Comic/comicTypes';
import SelectInput from './SelectInput';

const comicTypeOptions = [
  { key: comicTypes.STANDARD, value: 'Standard' },
  { key: comicTypes.DAILY, value: 'Daily' },
  { key: comicTypes.ANIME, value: 'Anime' }
];

function ComicTypeSelectInput(props) {
  const values = [...comicTypeOptions];

  const {
    includeNoChange,
    includeMixed
  } = props;

  if (includeNoChange) {
    values.unshift({
      key: 'noChange',
      value: 'No Change',
      disabled: true
    });
  }

  if (includeMixed) {
    values.unshift({
      key: 'mixed',
      value: '(Mixed)',
      disabled: true
    });
  }

  return (
    <SelectInput
      {...props}
      values={values}
    />
  );
}

ComicTypeSelectInput.propTypes = {
  includeNoChange: PropTypes.bool.isRequired,
  includeMixed: PropTypes.bool.isRequired
};

ComicTypeSelectInput.defaultProps = {
  includeNoChange: false,
  includeMixed: false
};

export default ComicTypeSelectInput;

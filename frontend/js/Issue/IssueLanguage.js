import PropTypes from 'prop-types';
import React from 'react';
import Label from 'Components/Label';
import { kinds } from 'Helpers/Props';

function IssueLanguage(props) {
  const {
    className,
    language,
    isCutoffNotMet
  } = props;

  if (!language) {
    return null;
  }

  return (
    <Label
      className={className}
      kind={isCutoffNotMet ? kinds.INVERSE : kinds.DEFAULT}
    >
      {language.name}
    </Label>
  );
}

IssueLanguage.propTypes = {
  className: PropTypes.string,
  language: PropTypes.object,
  isCutoffNotMet: PropTypes.bool
};

IssueLanguage.defaultProps = {
  isCutoffNotMet: true
};

export default IssueLanguage;

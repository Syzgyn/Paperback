import PropTypes from 'prop-types';
import React from 'react';
import formatBytes from 'Utilities/Number/formatBytes';
import { kinds } from 'Helpers/Props';
import Label from 'Components/Label';

function getTooltip(title, size) {
  if (!title) {
    return;
  }

  if (size) {
    title += ` - ${formatBytes(size)}`;
  }

  return title;
}

function IssueQuality(props) {
  const {
    className,
    title,
    size,
    fileType,
  } = props;

  return (
    <Label
      className={className}
      kind={kinds.DEFAULT}
      title={getTooltip(title, size)}
    >
      {fileType}
    </Label>
  );
}

IssueQuality.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  size: PropTypes.number,
  fileType: PropTypes.string.isRequired,
};

IssueQuality.defaultProps = {
  title: ''
};

export default IssueQuality;

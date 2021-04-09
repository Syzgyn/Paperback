import PropTypes from 'prop-types';
import React from 'react';
import Link from 'Components/Link/Link';

function ComicTitleLink({ titleSlug, title }) {
  const link = `/comic/${titleSlug}`;

  return (
    <Link to={link}>
      {title}
    </Link>
  );
}

ComicTitleLink.propTypes = {
  titleSlug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default ComicTitleLink;

import PropTypes from 'prop-types';
import React from 'react';
import { kinds, sizes } from 'Helpers/Props';
import Label from 'Components/Label';
import Link from 'Components/Link/Link';
import styles from './ComicDetailsLinks.css';

const ComicDetailsLinks = ({links}) => (
    <div className={styles.links}>
      {links.map(item => (
      <Link
        className={styles.link}
        to={item.url}
      >
        <Label
          className={styles.linkLabel}
          kind={kinds.INFO}
          size={sizes.LARGE}
        >
          {item.name}
        </Label>
      </Link>
      ))}
    </div>
);

ComicDetailsLinks.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })).isRequired,
};

export default ComicDetailsLinks;

import PropTypes from 'prop-types';
import React from 'react';
import { kinds, sizes } from 'Helpers/Props';
import Label from 'Components/Label';
import Link from 'Components/Link/Link';
import styles from './ComicDetailsLinks.css';

const ComicDetailsLinks = ({cvid}) => (
    <div className={styles.links}>
      <Link
        className={styles.link}
        to={`https://comicvine.gamespot.com/volume/4050-${cvid}/`}
      >
        <Label
          className={styles.linkLabel}
          kind={kinds.INFO}
          size={sizes.LARGE}
        >
          ComicVine
        </Label>
      </Link>
    </div>
);

ComicDetailsLinks.propTypes = {
    cvid: PropTypes.number.isRequired,
};

export default ComicDetailsLinks;

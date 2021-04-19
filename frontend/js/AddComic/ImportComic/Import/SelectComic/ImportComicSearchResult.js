import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Link from 'Components/Link/Link';
import ImportComicTitle from './ImportComicTitle';
import styles from './ImportComicSearchResult.css';

class ImportComicSearchResult extends Component {

  //
  // Listeners

  onPress = () => {
    this.props.onPress(this.props.cvid);
  }

  //
  // Render

  render() {
    const {
      title,
      year,
      publisher,
      isExistingComic
    } = this.props;

    return (
      <Link
        className={styles.comic}
        onPress={this.onPress}
      >
        <ImportComicTitle
          title={title}
          year={year}
          publisher={publisher}
          isExistingComic={isExistingComic}
        />
      </Link>
    );
  }
}

ImportComicSearchResult.propTypes = {
  cvid: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  publisher: PropTypes.string,
  isExistingComic: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired
};

export default ImportComicSearchResult;

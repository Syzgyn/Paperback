import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Link from 'Components/Link/Link';
import styles from './SelectComicRow.css';

class SelectComicRow extends Component {

  //
  // Listeners

  onPress = () => {
    this.props.onComicSelect(this.props.id);
  }

  //
  // Render

  render() {
    return (
      <Link
        className={styles.comic}
        component="div"
        onPress={this.onPress}
      >
        {this.props.title}
      </Link>
    );
  }
}

SelectComicRow.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  onComicSelect: PropTypes.func.isRequired
};

export default SelectComicRow;

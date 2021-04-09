import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import parseUrl from 'Utilities/String/parseUrl';
import { lookupComic, clearAddComic } from 'Store/Actions/addComicActions';
import { fetchRootFolders } from 'Store/Actions/rootFolderActions';
import AddNewComic from './AddNewComic';

function createMapStateToProps() {
  return createSelector(
    (state) => state.addComic,
    (state) => state.comic.items.length,
    (state) => state.router.location,
    (addComic, existingComicCount, location) => {
      const { params } = parseUrl(location.search);

      return {
        ...addComic,
        term: params.term,
        hasExistingComic: existingComicCount > 0
      };
    }
  );
}

const mapDispatchToProps = {
  lookupComic,
  clearAddComic,
  fetchRootFolders
};

class AddNewComicConnector extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this._comicLookupTimeout = null;
  }

  componentDidMount() {
    this.props.fetchRootFolders();
  }

  componentWillUnmount() {
    if (this._comicLookupTimeout) {
      clearTimeout(this._comicLookupTimeout);
    }

    this.props.clearAddComic();
  }

  //
  // Listeners

  onComicLookupChange = (term) => {
    if (this._comicLookupTimeout) {
      clearTimeout(this._comicLookupTimeout);
    }

    if (term.trim() === '') {
      this.props.clearAddComic();
    } else {
      this._comicLookupTimeout = setTimeout(() => {
        this.props.lookupComic({ term });
      }, 300);
    }
  }

  onClearComicLookup = () => {
    this.props.clearAddComic();
  }

  //
  // Render

  render() {
    const {
      term,
      ...otherProps
    } = this.props;

    return (
      <AddNewComic
        term={term}
        {...otherProps}
        onComicLookupChange={this.onComicLookupChange}
        onClearComicLookup={this.onClearComicLookup}
      />
    );
  }
}

AddNewComicConnector.propTypes = {
  term: PropTypes.string,
  lookupComic: PropTypes.func.isRequired,
  clearAddComic: PropTypes.func.isRequired,
  fetchRootFolders: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(AddNewComicConnector);

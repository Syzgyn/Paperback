import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { push } from 'connected-react-router';
import createAllComicSelector from 'Store/Selectors/createAllComicSelector';
import NotFound from 'Components/NotFound';
import ComicDetailsConnector from './ComicDetailsConnector';

function createMapStateToProps() {
  return createSelector(
    (state, { match }) => match,
    createAllComicSelector(),
    (match, allComic) => {
      const titleSlug = match.params.titleSlug;
      const comicIndex = _.findIndex(allComic, { titleSlug });

      if (comicIndex > -1) {
        return {
          titleSlug
        };
      }

      return {};
    }
  );
}

const mapDispatchToProps = {
  push
};

class ComicDetailsPageConnector extends Component {

  //
  // Lifecycle

  componentDidUpdate(prevProps) {
    if (!this.props.titleSlug) {
      this.props.push(`${window.Sonarr.urlBase}/`);
      return;
    }
  }

  //
  // Render

  render() {
    const {
      titleSlug
    } = this.props;

    if (!titleSlug) {
      return (
        <NotFound
          message="Sorry, that comic cannot be found."
        />
      );
    }

    return (
      <ComicDetailsConnector
        titleSlug={titleSlug}
      />
    );
  }
}

ComicDetailsPageConnector.propTypes = {
  titleSlug: PropTypes.string,
  match: PropTypes.shape({ params: PropTypes.shape({ titleSlug: PropTypes.string.isRequired }).isRequired }).isRequired,
  push: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(ComicDetailsPageConnector);

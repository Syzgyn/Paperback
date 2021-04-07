import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { fetchComicHistory, clearComicHistory, comicHistoryMarkAsFailed } from 'Store/Actions/comicHistoryActions';
import ComicHistoryModalContent from './ComicHistoryModalContent';

function createMapStateToProps() {
  return createSelector(
    (state) => state.comicHistory,
    (comicHistory) => {
      return comicHistory;
    }
  );
}

const mapDispatchToProps = {
  fetchComicHistory,
  clearComicHistory,
  comicHistoryMarkAsFailed
};

class ComicHistoryModalContentConnector extends Component {

  //
  // Lifecycle

  componentDidMount() {
    const {
      comicId,
      seasonNumber
    } = this.props;

    this.props.fetchComicHistory({
      comicId,
      seasonNumber
    });
  }

  componentWillUnmount() {
    this.props.clearComicHistory();
  }

  //
  // Listeners

  onMarkAsFailedPress(historyId) {
    const {
      comicId,
      seasonNumber
    } = this.props;

    this.props.comicHistoryMarkAsFailed({
      historyId,
      comicId,
      seasonNumber
    });
  }

  //
  // Render

  render() {
    return (
      <ComicHistoryModalContent
        {...this.props}
        onMarkAsFailedPress={this.onMarkAsFailedPress}
      />
    );
  }
}

ComicHistoryModalContentConnector.propTypes = {
  comicId: PropTypes.number.isRequired,
  seasonNumber: PropTypes.number,
  fetchComicHistory: PropTypes.func.isRequired,
  clearComicHistory: PropTypes.func.isRequired,
  comicHistoryMarkAsFailed: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(ComicHistoryModalContentConnector);

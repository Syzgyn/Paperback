import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createComicSelector from 'Store/Selectors/createComicSelector';
import { toggleComicMonitored, toggleSeasonMonitored } from 'Store/Actions/comicActions';
import SeasonPassRow from './SeasonPassRow';

function createMapStateToProps() {
  return createSelector(
    createComicSelector(),
    (comic) => {
      return _.pick(comic, [
        'status',
        'titleSlug',
        'title',
        'monitored',
        'seasons',
        'isSaving'
      ]);
    }
  );
}

const mapDispatchToProps = {
  toggleComicMonitored,
  toggleSeasonMonitored
};

class SeasonPassRowConnector extends Component {

  //
  // Listeners

  onComicMonitoredPress = () => {
    const {
      comicId,
      monitored
    } = this.props;

    this.props.toggleComicMonitored({
      comicId,
      monitored: !monitored
    });
  }

  onSeasonMonitoredPress = (seasonNumber, monitored) => {
    this.props.toggleSeasonMonitored({
      comicId: this.props.comicId,
      seasonNumber,
      monitored
    });
  }

  //
  // Render

  render() {
    return (
      <SeasonPassRow
        {...this.props}
        onComicMonitoredPress={this.onComicMonitoredPress}
        onSeasonMonitoredPress={this.onSeasonMonitoredPress}
      />
    );
  }
}

SeasonPassRowConnector.propTypes = {
  comicId: PropTypes.number.isRequired,
  monitored: PropTypes.bool.isRequired,
  toggleComicMonitored: PropTypes.func.isRequired,
  toggleSeasonMonitored: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(SeasonPassRowConnector);

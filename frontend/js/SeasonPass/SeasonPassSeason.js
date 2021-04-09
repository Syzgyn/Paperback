import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import padNumber from 'Utilities/Number/padNumber';
import MonitorToggleButton from 'Components/MonitorToggleButton';
import styles from './SeasonPassSeason.css';

class SeasonPassSeason extends Component {

  //
  // Listeners

  onSeasonMonitoredPress = () => {
    const {
      seasonNumber,
      monitored
    } = this.props;

    this.props.onSeasonMonitoredPress(seasonNumber, !monitored);
  }

  //
  // Render

  render() {
    const {
      seasonNumber,
      monitored,
      statistics,
      isSaving
    } = this.props;

    const {
      issueFileCount,
      totalIssueCount,
      percentOfIssues
    } = statistics;

    return (
      <div className={styles.season}>
        <div className={styles.info}>
          <MonitorToggleButton
            monitored={monitored}
            isSaving={isSaving}
            onPress={this.onSeasonMonitoredPress}
          />

          <span>
            {
              seasonNumber === 0 ? 'Specials' : `S${padNumber(seasonNumber, 2)}`
            }
          </span>
        </div>

        <div
          className={classNames(
            styles.issues,
            percentOfIssues === 100 && styles.allIssues
          )}
          title={`${issueFileCount}/${totalIssueCount} issues downloaded`}
        >
          {
            totalIssueCount === 0 ? '0/0' : `${issueFileCount}/${totalIssueCount}`
          }
        </div>
      </div>
    );
  }
}

SeasonPassSeason.propTypes = {
  seasonNumber: PropTypes.number.isRequired,
  monitored: PropTypes.bool.isRequired,
  statistics: PropTypes.object.isRequired,
  isSaving: PropTypes.bool.isRequired,
  onSeasonMonitoredPress: PropTypes.func.isRequired
};

SeasonPassSeason.defaultProps = {
  isSaving: false,
  statistics: {
    issueFileCount: 0,
    totalIssueCount: 0,
    percentOfIssues: 0
  }
};

export default SeasonPassSeason;

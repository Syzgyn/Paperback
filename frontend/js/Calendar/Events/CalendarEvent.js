import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import { icons, kinds } from 'Helpers/Props';
import formatTime from 'Utilities/Date/formatTime';
import padNumber from 'Utilities/Number/padNumber';
import getStatusStyle from 'Calendar/getStatusStyle';
import issueEntities from 'Issue/issueEntities';
import Icon from 'Components/Icon';
import Link from 'Components/Link/Link';
import IssueDetailsModal from 'Issue/IssueDetailsModal';
import CalendarEventQueueDetails from './CalendarEventQueueDetails';
import styles from './CalendarEvent.css';

class CalendarEvent extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isDetailsModalOpen: false
    };
  }

  //
  // Listeners

  onPress = () => {
    this.setState({ isDetailsModalOpen: true }, () => {
      this.props.onEventModalOpenToggle(true);
    });
  }

  onDetailsModalClose = () => {
    this.setState({ isDetailsModalOpen: false }, () => {
      this.props.onEventModalOpenToggle(false);
    });
  }

  //
  // Render

  render() {
    const {
      id,
      comic,
      issueFile,
      title,
      seasonNumber,
      issueNumber,
      absoluteIssueNumber,
      releaseDateUtc,
      monitored,
      hasFile,
      grabbed,
      queueItem,
      showIssueInformation,
      showFinaleIcon,
      showSpecialIcon,
      showCutoffUnmetIcon,
      fullColorEvents,
      timeFormat,
      colorImpairedMode
    } = this.props;

    if (!comic) {
      return null;
    }

    const startTime = moment(releaseDateUtc);
    const endTime = moment(releaseDateUtc).add(comic.runtime, 'minutes');
    const isDownloading = !!(queueItem || grabbed);
    const isMonitored = comic.monitored && monitored;
    const statusStyle = getStatusStyle(hasFile, isDownloading, startTime, endTime, isMonitored);
    const missingAbsoluteNumber = comic.comicType === 'anime' && seasonNumber > 0 && !absoluteIssueNumber;
    const season = comic.seasons.find((s) => s.seasonNumber === seasonNumber);
    const seasonStatistics = season.statistics || {};

    return (
      <Fragment>
        <Link
          className={classNames(
            styles.event,
            styles[statusStyle],
            colorImpairedMode && 'colorImpaired',
            fullColorEvents && 'fullColor'
          )}
          component="div"
          onPress={this.onPress}
        >
          <div className={styles.info}>
            <div className={styles.comicTitle}>
              {comic.title}
            </div>

            <div className={styles.statusContainer}>
              {
                missingAbsoluteNumber ?
                  <Icon
                    className={styles.statusIcon}
                    name={icons.WARNING}
                    title="Issue does not have an absolute issue number"
                  /> :
                  null
              }

              {
                queueItem ?
                  <span className={styles.statusIcon}>
                    <CalendarEventQueueDetails
                      {...queueItem}
                    />
                  </span> :
                  null
              }

              {
                !queueItem && grabbed ?
                  <Icon
                    className={styles.statusIcon}
                    name={icons.DOWNLOADING}
                    title="Issue is downloading"
                  /> :
                  null
              }

              {
                showCutoffUnmetIcon &&
                !!issueFile &&
                issueFile.qualityCutoffNotMet ?
                  <Icon
                    className={styles.statusIcon}
                    name={icons.ISSUE_FILE}
                    kind={fullColorEvents ? kinds.DEFAULT : kinds.WARNING}
                    title="Quality cutoff has not been met"
                  /> :
                  null
              }

              {
                showCutoffUnmetIcon &&
                !!issueFile &&
                issueFile.languageCutoffNotMet &&
                !issueFile.qualityCutoffNotMet ?
                  <Icon
                    className={styles.statusIcon}
                    name={icons.ISSUE_FILE}
                    kind={fullColorEvents ? kinds.DEFAULT : kinds.WARNING}
                    title="Language cutoff has not been met"
                  /> :
                  null
              }

              {
                issueNumber === 1 && seasonNumber > 0 ?
                  <Icon
                    className={styles.statusIcon}
                    name={icons.INFO}
                    kind={kinds.INFO}
                    darken={fullColorEvents}
                    title={seasonNumber === 1 ? 'Comic premiere' : 'Season premiere'}
                  /> :
                  null
              }

              {
                showFinaleIcon &&
                issueNumber !== 1 &&
                seasonNumber > 0 &&
                issueNumber === seasonStatistics.totalIssueCount ?
                  <Icon
                    className={styles.statusIcon}
                    name={icons.INFO}
                    kind={fullColorEvents ? kinds.DEFAULT : kinds.WARNING}
                    title={comic.status === 'ended' ? 'Comic finale' : 'Season finale'}
                  /> :
                  null
              }

              {
                showSpecialIcon &&
                (issueNumber === 0 || seasonNumber === 0) ?
                  <Icon
                    className={styles.statusIcon}
                    name={icons.INFO}
                    kind={kinds.PINK}
                    darken={fullColorEvents}
                    title="Special"
                  /> :
                  null
              }
            </div>
          </div>

          {
            showIssueInformation ?
              <div className={styles.issueInfo}>
                <div className={styles.issueTitle}>
                  {title}
                </div>

                <div>
                  {seasonNumber}x{padNumber(issueNumber, 2)}

                  {
                    comic.comicType === 'anime' && absoluteIssueNumber ?
                      <span className={styles.absoluteIssueNumber}>({absoluteIssueNumber})</span> : null
                  }
                </div>
              </div> :
              null
          }

          <div className={styles.airTime}>
            {formatTime(releaseDateUtc, timeFormat)} - {formatTime(endTime.toISOString(), timeFormat, { includeMinuteZero: true })}
          </div>
        </Link>

        <IssueDetailsModal
          isOpen={this.state.isDetailsModalOpen}
          issueId={id}
          issueEntity={issueEntities.CALENDAR}
          comicId={comic.id}
          issueTitle={title}
          showOpenComicButton={true}
          onModalClose={this.onDetailsModalClose}
        />
      </Fragment>
    );
  }
}

CalendarEvent.propTypes = {
  id: PropTypes.number.isRequired,
  comic: PropTypes.object.isRequired,
  issueFile: PropTypes.object,
  title: PropTypes.string.isRequired,
  seasonNumber: PropTypes.number.isRequired,
  issueNumber: PropTypes.number.isRequired,
  absoluteIssueNumber: PropTypes.number,
  releaseDateUtc: PropTypes.string.isRequired,
  monitored: PropTypes.bool.isRequired,
  hasFile: PropTypes.bool.isRequired,
  grabbed: PropTypes.bool,
  queueItem: PropTypes.object,
  showIssueInformation: PropTypes.bool.isRequired,
  showFinaleIcon: PropTypes.bool.isRequired,
  showSpecialIcon: PropTypes.bool.isRequired,
  showCutoffUnmetIcon: PropTypes.bool.isRequired,
  fullColorEvents: PropTypes.bool.isRequired,
  timeFormat: PropTypes.string.isRequired,
  colorImpairedMode: PropTypes.bool.isRequired,
  onEventModalOpenToggle: PropTypes.func.isRequired
};

export default CalendarEvent;

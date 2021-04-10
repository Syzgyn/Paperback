import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import formatTime from 'Utilities/Date/formatTime';
import padNumber from 'Utilities/Number/padNumber';
import { icons, kinds } from 'Helpers/Props';
import getStatusStyle from 'Calendar/getStatusStyle';
import Icon from 'Components/Icon';
import Link from 'Components/Link/Link';
import issueEntities from 'Issue/issueEntities';
import IssueDetailsModal from 'Issue/IssueDetailsModal';
import CalendarEventQueueDetails from 'Calendar/Events/CalendarEventQueueDetails';
import styles from './AgendaEvent.css';

class AgendaEvent extends Component {
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
    this.setState({ isDetailsModalOpen: true });
  }

  onDetailsModalClose = () => {
    this.setState({ isDetailsModalOpen: false });
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
      showDate,
      showIssueInformation,
      showFinaleIcon,
      showSpecialIcon,
      showCutoffUnmetIcon,
      timeFormat,
      longDateFormat,
      colorImpairedMode
    } = this.props;

    const startTime = moment(releaseDateUtc);
    const endTime = moment(releaseDateUtc).add(comic.runtime, 'minutes');
    const downloading = !!(queueItem || grabbed);
    const isMonitored = comic.monitored && monitored;
    const statusStyle = getStatusStyle(hasFile, downloading, startTime, endTime, isMonitored);
    const missingAbsoluteNumber = comic.comicType === 'anime' && seasonNumber > 0 && !absoluteIssueNumber;
    const season = comic.seasons.find((s) => s.seasonNumber === seasonNumber);
    const seasonStatistics = season.statistics || {};

    return (
      <div>
        <Link
          className={styles.event}
          component="div"
          onPress={this.onPress}
        >
          <div className={styles.date}>
            {
              showDate &&
                startTime.format(longDateFormat)
            }
          </div>

          <div
            className={classNames(
              styles.eventWrapper,
              styles[statusStyle],
              colorImpairedMode && 'colorImpaired'
            )}
          >
            <div className={styles.time}>
              {formatTime(releaseDateUtc, timeFormat)} - {formatTime(endTime.toISOString(), timeFormat, { includeMinuteZero: true })}
            </div>

            <div className={styles.comicTitle}>
              {comic.title}
            </div>

            {
              showIssueInformation &&
                <div className={styles.seasonIssueNumber}>
                  {seasonNumber}x{padNumber(issueNumber, 2)}

                  {
                    comic.comicType === 'anime' && absoluteIssueNumber &&
                      <span className={styles.absoluteIssueNumber}>({absoluteIssueNumber})</span>
                  }

                  <div className={styles.issueSeparator}> - </div>
                </div>
            }

            <div className={styles.issueTitle}>
              {
                showIssueInformation &&
                title
              }
            </div>

            {
              missingAbsoluteNumber &&
                <Icon
                  className={styles.statusIcon}
                  name={icons.WARNING}
                  title="Issue does not have an absolute issue number"
                />
            }

            {
              !!queueItem &&
                <span className={styles.statusIcon}>
                  <CalendarEventQueueDetails
                    comicType={comic.comicType}
                    seasonNumber={seasonNumber}
                    absoluteIssueNumber={absoluteIssueNumber}
                    {...queueItem}
                  />
                </span>
            }

            {
              !queueItem && grabbed &&
                <Icon
                  className={styles.statusIcon}
                  name={icons.DOWNLOADING}
                  title="Issue is downloading"
                />
            }

            {
              showCutoffUnmetIcon &&
              !!issueFile &&
              issueFile.qualityCutoffNotMet &&
                <Icon
                  className={styles.statusIcon}
                  name={icons.ISSUE_FILE}
                  kind={kinds.WARNING}
                  title="Quality cutoff has not been met"
                />
            }

            {
              showCutoffUnmetIcon &&
              !!issueFile &&
              issueFile.languageCutoffNotMet &&
              !issueFile.qualityCutoffNotMet &&
                <Icon
                  className={styles.statusIcon}
                  name={icons.ISSUE_FILE}
                  kind={kinds.WARNING}
                  title="Language cutoff has not been met"
                />
            }

            {
              issueNumber === 1 && seasonNumber > 0 &&
                <Icon
                  className={styles.statusIcon}
                  name={icons.INFO}
                  kind={kinds.INFO}
                  title={seasonNumber === 1 ? 'Comic Premiere' : 'Season Premiere'}
                />
            }

            {
              showFinaleIcon &&
              issueNumber !== 1 &&
              seasonNumber > 0 &&
              issueNumber === seasonStatistics.totalIssueCount &&
                <Icon
                  className={styles.statusIcon}
                  name={icons.INFO}
                  kind={kinds.WARNING}
                  title={comic.status === 'ended' ? 'Comic finale' : 'Season finale'}
                />
            }

            {
              showSpecialIcon &&
              (issueNumber === 0 || seasonNumber === 0) &&
                <Icon
                  className={styles.statusIcon}
                  name={icons.INFO}
                  kind={kinds.PINK}
                  title="Special"
                />
            }
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
      </div>
    );
  }
}

AgendaEvent.propTypes = {
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
  showDate: PropTypes.bool.isRequired,
  showIssueInformation: PropTypes.bool.isRequired,
  showFinaleIcon: PropTypes.bool.isRequired,
  showSpecialIcon: PropTypes.bool.isRequired,
  showCutoffUnmetIcon: PropTypes.bool.isRequired,
  timeFormat: PropTypes.string.isRequired,
  longDateFormat: PropTypes.string.isRequired,
  colorImpairedMode: PropTypes.bool.isRequired
};

export default AgendaEvent;

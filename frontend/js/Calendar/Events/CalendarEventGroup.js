import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import formatTime from 'Utilities/Date/formatTime';
import padNumber from 'Utilities/Number/padNumber';
import { icons, kinds } from 'Helpers/Props';
import Icon from 'Components/Icon';
import Link from 'Components/Link/Link';
import getStatusStyle from 'Calendar/getStatusStyle';
import CalendarEventConnector from 'Calendar/Events/CalendarEventConnector';
import styles from './CalendarEventGroup.css';

function getEventsInfo(events) {
  let files = 0;
  let queued = 0;
  let monitored = 0;
  let absoluteIssueNumbers = 0;

  events.forEach((event) => {
    if (event.issueFileId) {
      files++;
    }

    if (event.queued) {
      queued++;
    }

    if (event.monitored) {
      monitored++;
    }

    if (event.absoluteIssueNumber) {
      absoluteIssueNumbers++;
    }
  });

  return {
    allDownloaded: files === events.length,
    anyQueued: queued > 0,
    anyMonitored: monitored > 0,
    allAbsoluteIssueNumbers: absoluteIssueNumbers === events.length
  };
}

class CalendarEventGroup extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isExpanded: false
    };
  }

  //
  // Listeners

  onExpandPress = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  //
  // Render

  render() {
    const {
      comic,
      events,
      isDownloading,
      showIssueInformation,
      showFinaleIcon,
      timeFormat,
      fullColorEvents,
      colorImpairedMode,
      onEventModalOpenToggle
    } = this.props;

    const { isExpanded } = this.state;
    const {
      allDownloaded,
      anyQueued,
      anyMonitored,
      allAbsoluteIssueNumbers
    } = getEventsInfo(events);
    const anyDownloading = isDownloading || anyQueued;
    const firstIssue = events[0];
    const lastIssue = events[events.length -1];
    const releaseDateUtc = firstIssue.releaseDateUtc;
    const startTime = moment(releaseDateUtc);
    const endTime = moment(lastIssue.releaseDateUtc).add(comic.runtime, 'minutes');
    const seasonNumber = firstIssue.seasonNumber;
    const statusStyle = getStatusStyle(allDownloaded, anyDownloading, startTime, endTime, anyMonitored);
    const isMissingAbsoluteNumber = comic.comicType === 'anime' && seasonNumber > 0 && !allAbsoluteIssueNumbers;

    if (isExpanded) {
      return (
        <div>
          {
            events.map((event) => {
              if (event.isGroup) {
                return null;
              }

              return (
                <CalendarEventConnector
                  key={event.id}
                  issueId={event.id}
                  {...event}
                  onEventModalOpenToggle={onEventModalOpenToggle}
                />
              );
            })
          }

          <Link
            className={styles.collapseContainer}
            component="div"
            onPress={this.onExpandPress}
          >
            <Icon
              name={icons.COLLAPSE}
            />
          </Link>
        </div>
      );
    }

    return (
      <div
        className={classNames(
          styles.eventGroup,
          styles[statusStyle],
          colorImpairedMode && 'colorImpaired',
          fullColorEvents && 'fullColor'
        )}
      >
        <div className={styles.info}>
          <div className={styles.comicTitle}>
            {comic.title}
          </div>

          {
            isMissingAbsoluteNumber &&
              <Icon
                containerClassName={styles.statusIcon}
                name={icons.WARNING}
                title="Issue does not have an absolute issue number"
              />
          }

          {
            anyDownloading &&
              <Icon
                containerClassName={styles.statusIcon}
                name={icons.DOWNLOADING}
                title="An issue is downloading"
              />
          }

          {
            firstIssue.issueNumber === 1 && seasonNumber > 0 &&
              <Icon
                containerClassName={styles.statusIcon}
                name={icons.INFO}
                kind={kinds.INFO}
                darken={fullColorEvents}
                title={seasonNumber === 1 ? 'Comic Premiere' : 'Season Premiere'}
              />
          }

          {
            showFinaleIcon &&
            lastIssue.issueNumber !== 1 &&
            seasonNumber > 0 &&
            lastIssue.issueNumber === comic.seasons.find((season) => season.seasonNumber === seasonNumber).statistics.totalIssueCount &&
              <Icon
                containerClassName={styles.statusIcon}
                name={icons.INFO}
                kind={fullColorEvents ? kinds.DEFAULT : kinds.WARNING}
                title={comic.status === 'ended' ? 'Comic finale' : 'Season finale'}
              />
          }
        </div>

        <div className={styles.airingInfo}>
          <div className={styles.airTime}>
            {formatTime(releaseDateUtc, timeFormat)} - {formatTime(endTime.toISOString(), timeFormat, { includeMinuteZero: true })}
          </div>

          {
            showIssueInformation ?
              <div className={styles.issueInfo}>
                {seasonNumber}x{padNumber(firstIssue.issueNumber, 2)}-{padNumber(lastIssue.issueNumber, 2)}

                {
                  comic.comicType === 'anime' &&
                  firstIssue.absoluteIssueNumber &&
                  lastIssue.absoluteIssueNumber &&
                    <span className={styles.absoluteIssueNumber}>
                      ({firstIssue.absoluteIssueNumber}-{lastIssue.absoluteIssueNumber})
                    </span>
                }
              </div> :
              <Link
                className={styles.expandContainerInline}
                component="div"
                onPress={this.onExpandPress}
              >
                <Icon
                  name={icons.EXPAND}
                />
              </Link>
          }
        </div>

        {
          showIssueInformation &&
            <Link
              className={styles.expandContainer}
              component="div"
              onPress={this.onExpandPress}
            >
              <Icon
                name={icons.EXPAND}
              />
            </Link>
        }
      </div>
    );
  }
}

CalendarEventGroup.propTypes = {
  comic: PropTypes.object.isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  isDownloading: PropTypes.bool.isRequired,
  showIssueInformation: PropTypes.bool.isRequired,
  showFinaleIcon: PropTypes.bool.isRequired,
  fullColorEvents: PropTypes.bool.isRequired,
  timeFormat: PropTypes.string.isRequired,
  colorImpairedMode: PropTypes.bool.isRequired,
  onEventModalOpenToggle: PropTypes.func.isRequired
};

export default CalendarEventGroup;

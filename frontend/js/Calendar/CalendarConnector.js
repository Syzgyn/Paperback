import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { registerPagePopulator, unregisterPagePopulator } from 'Utilities/pagePopulator';
import hasDifferentItems from 'Utilities/Object/hasDifferentItems';
import selectUniqueIds from 'Utilities/Object/selectUniqueIds';
import * as calendarActions from 'Store/Actions/calendarActions';
import { fetchIssueFiles, clearIssueFiles } from 'Store/Actions/issueFileActions';
import { fetchQueueDetails, clearQueueDetails } from 'Store/Actions/queueActions';
import createCommandExecutingSelector from 'Store/Selectors/createCommandExecutingSelector';
import * as commandNames from 'Commands/commandNames';
import Calendar from './Calendar';

const UPDATE_DELAY = 3600000; // 1 hour

function createMapStateToProps() {
  return createSelector(
    (state) => state.calendar,
    (state) => state.settings.ui.item.firstDayOfWeek,
    createCommandExecutingSelector(commandNames.REFRESH_COMIC),
    (calendar, firstDayOfWeek, isRefreshingComic) => {
      return {
        ...calendar,
        isRefreshingComic,
        firstDayOfWeek
      };
    }
  );
}

const mapDispatchToProps = {
  ...calendarActions,
  fetchIssueFiles,
  clearIssueFiles,
  fetchQueueDetails,
  clearQueueDetails
};

class CalendarConnector extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.updateTimeoutId = null;
  }

  componentDidMount() {
    const {
      useCurrentPage,
      fetchCalendar,
      gotoCalendarToday
    } = this.props;

    registerPagePopulator(this.repopulate);

    if (useCurrentPage) {
      fetchCalendar();
    } else {
      gotoCalendarToday();
    }

    this.scheduleUpdate();
  }

  componentDidUpdate(prevProps) {
    const {
      items,
      time,
      view,
      isRefreshingComic,
      firstDayOfWeek
    } = this.props;

    if (hasDifferentItems(prevProps.items, items)) {
      const issueIds = selectUniqueIds(items, 'id');
      const issueFileIds = selectUniqueIds(items, 'issueFileId');

      if (items.length) {
        this.props.fetchQueueDetails({ issueIds });
      }

      if (issueFileIds.length) {
        this.props.fetchIssueFiles({ issueFileIds });
      }
    }

    if (prevProps.time !== time) {
      this.scheduleUpdate();
    }

    if (prevProps.firstDayOfWeek !== firstDayOfWeek) {
      this.props.fetchCalendar({ time, view });
    }

    if (prevProps.isRefreshingComic && !isRefreshingComic) {
      this.props.fetchCalendar({ time, view });
    }
  }

  componentWillUnmount() {
    unregisterPagePopulator(this.repopulate);
    this.props.clearCalendar();
    this.props.clearQueueDetails();
    this.props.clearIssueFiles();
    this.clearUpdateTimeout();
  }

  //
  // Control

  repopulate = () => {
    const {
      time,
      view
    } = this.props;

    this.props.fetchQueueDetails({ time, view });
    this.props.fetchCalendar({ time, view });
  }

  scheduleUpdate = () => {
    this.clearUpdateTimeout();

    this.updateTimeoutId = setTimeout(this.updateCalendar, UPDATE_DELAY);
  }

  clearUpdateTimeout = () => {
    if (this.updateTimeoutId) {
      clearTimeout(this.updateTimeoutId);
    }
  }

  updateCalendar = () => {
    this.props.gotoCalendarToday();
    this.scheduleUpdate();
  }

  //
  // Listeners

  onCalendarViewChange = (view) => {
    this.props.setCalendarView({ view });
  }

  onTodayPress = () => {
    this.props.gotoCalendarToday();
  }

  onPreviousPress = () => {
    this.props.gotoCalendarPreviousRange();
  }

  onNextPress = () => {
    this.props.gotoCalendarNextRange();
  }

  //
  // Render

  render() {
    return (
      <Calendar
        {...this.props}
        onCalendarViewChange={this.onCalendarViewChange}
        onTodayPress={this.onTodayPress}
        onPreviousPress={this.onPreviousPress}
        onNextPress={this.onNextPress}
      />
    );
  }
}

CalendarConnector.propTypes = {
  useCurrentPage: PropTypes.bool.isRequired,
  time: PropTypes.string,
  view: PropTypes.string.isRequired,
  firstDayOfWeek: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  isRefreshingComic: PropTypes.bool.isRequired,
  setCalendarView: PropTypes.func.isRequired,
  gotoCalendarToday: PropTypes.func.isRequired,
  gotoCalendarPreviousRange: PropTypes.func.isRequired,
  gotoCalendarNextRange: PropTypes.func.isRequired,
  clearCalendar: PropTypes.func.isRequired,
  fetchCalendar: PropTypes.func.isRequired,
  fetchIssueFiles: PropTypes.func.isRequired,
  clearIssueFiles: PropTypes.func.isRequired,
  fetchQueueDetails: PropTypes.func.isRequired,
  clearQueueDetails: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(CalendarConnector);

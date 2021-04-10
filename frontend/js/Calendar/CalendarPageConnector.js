import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import moment from 'moment';
import { isCommandExecuting } from 'Utilities/Command';
import isBefore from 'Utilities/Date/isBefore';
import * as commandNames from 'Commands/commandNames';
import withCurrentPage from 'Components/withCurrentPage';
import { executeCommand } from 'Store/Actions/commandActions';
import { searchMissing, setCalendarDaysCount, setCalendarFilter } from 'Store/Actions/calendarActions';
import createComicCountSelector from 'Store/Selectors/createComicCountSelector';
import createUISettingsSelector from 'Store/Selectors/createUISettingsSelector';
import createCommandsSelector from 'Store/Selectors/createCommandsSelector';
import createCommandExecutingSelector from 'Store/Selectors/createCommandExecutingSelector';
import CalendarPage from './CalendarPage';

function createMissingIssueIdsSelector() {
  return createSelector(
    (state) => state.calendar.start,
    (state) => state.calendar.end,
    (state) => state.calendar.items,
    (state) => state.queue.details.items,
    (start, end, issues, queueDetails) => {
      return issues.reduce((acc, issue) => {
        const releaseDateUtc = issue.releaseDateUtc;

        if (
          !issue.issueFileId &&
          moment(releaseDateUtc).isAfter(start) &&
          moment(releaseDateUtc).isBefore(end) &&
          isBefore(issue.releaseDateUtc) &&
          !queueDetails.some((details) => !!details.issue && details.issue.id === issue.id)
        ) {
          acc.push(issue.id);
        }

        return acc;
      }, []);
    }
  );
}

function createIsSearchingSelector() {
  return createSelector(
    (state) => state.calendar.searchMissingCommandId,
    createCommandsSelector(),
    (searchMissingCommandId, commands) => {
      if (searchMissingCommandId == null) {
        return false;
      }

      return isCommandExecuting(commands.find((command) => {
        return command.id === searchMissingCommandId;
      }));
    }
  );
}

function createMapStateToProps() {
  return createSelector(
    (state) => state.calendar.selectedFilterKey,
    (state) => state.calendar.filters,
    createComicCountSelector(),
    createUISettingsSelector(),
    createMissingIssueIdsSelector(),
    createCommandExecutingSelector(commandNames.RSS_SYNC),
    createIsSearchingSelector(),
    (
      selectedFilterKey,
      filters,
      comicCount,
      uiSettings,
      missingIssueIds,
      isRssSyncExecuting,
      isSearchingForMissing
    ) => {
      return {
        selectedFilterKey,
        filters,
        colorImpairedMode: uiSettings.enableColorImpairedMode,
        hasComic: !!comicCount,
        missingIssueIds,
        isRssSyncExecuting,
        isSearchingForMissing
      };
    }
  );
}

function createMapDispatchToProps(dispatch, props) {
  return {
    onRssSyncPress() {
      dispatch(executeCommand({
        name: commandNames.RSS_SYNC
      }));
    },

    onSearchMissingPress(issueIds) {
      dispatch(searchMissing({ issueIds }));
    },

    onDaysCountChange(dayCount) {
      dispatch(setCalendarDaysCount({ dayCount }));
    },

    onFilterSelect(selectedFilterKey) {
      dispatch(setCalendarFilter({ selectedFilterKey }));
    }
  };
}

export default withCurrentPage(
  connect(createMapStateToProps, createMapDispatchToProps)(CalendarPage)
);

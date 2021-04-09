import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createComicSelector from 'Store/Selectors/createComicSelector';
import createUISettingsSelector from 'Store/Selectors/createUISettingsSelector';
import CalendarEventGroup from './CalendarEventGroup';

function createIsDownloadingSelector() {
  return createSelector(
    (state, { issueIds }) => issueIds,
    (state) => state.queue.details,
    (issueIds, details) => {
      return details.items.some((item) => {
        return item.issue && issueIds.includes(item.issue.id);
      });
    }
  );
}

function createMapStateToProps() {
  return createSelector(
    (state) => state.calendar.options,
    createComicSelector(),
    createIsDownloadingSelector(),
    createUISettingsSelector(),
    (calendarOptions, comic, isDownloading, uiSettings) => {
      return {
        comic,
        isDownloading,
        ...calendarOptions,
        timeFormat: uiSettings.timeFormat,
        colorImpairedMode: uiSettings.enableColorImpairedMode
      };
    }
  );
}

export default connect(createMapStateToProps)(CalendarEventGroup);

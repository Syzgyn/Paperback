import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createComicSelector from 'Store/Selectors/createComicSelector';
import createUISettingsSelector from 'Store/Selectors/createUISettingsSelector';
import CalendarEventGroup from './CalendarEventGroup';

function createIsDownloadingSelector() {
  return createSelector(
    (state, { episodeIds }) => episodeIds,
    (state) => state.queue.details,
    (episodeIds, details) => {
      return details.items.some((item) => {
        return item.episode && episodeIds.includes(item.episode.id);
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

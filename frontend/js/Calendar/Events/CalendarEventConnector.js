import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createEpisodeFileSelector from 'Store/Selectors/createEpisodeFileSelector';
import createComicSelector from 'Store/Selectors/createComicSelector';
import createQueueItemSelector from 'Store/Selectors/createQueueItemSelector';
import createUISettingsSelector from 'Store/Selectors/createUISettingsSelector';
import CalendarEvent from './CalendarEvent';

function createMapStateToProps() {
  return createSelector(
    (state) => state.calendar.options,
    createComicSelector(),
    createEpisodeFileSelector(),
    createQueueItemSelector(),
    createUISettingsSelector(),
    (calendarOptions, comic, episodeFile, queueItem, uiSettings) => {
      return {
        comic,
        episodeFile,
        queueItem,
        ...calendarOptions,
        timeFormat: uiSettings.timeFormat,
        colorImpairedMode: uiSettings.enableColorImpairedMode
      };
    }
  );
}

export default connect(createMapStateToProps)(CalendarEvent);

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createIssueFileSelector from 'Store/Selectors/createIssueFileSelector';
import createComicSelector from 'Store/Selectors/createComicSelector';
import createQueueItemSelector from 'Store/Selectors/createQueueItemSelector';
import createUISettingsSelector from 'Store/Selectors/createUISettingsSelector';
import AgendaEvent from './AgendaEvent';

function createMapStateToProps() {
  return createSelector(
    (state) => state.calendar.options,
    createComicSelector(),
    createIssueFileSelector(),
    createQueueItemSelector(),
    createUISettingsSelector(),
    (calendarOptions, comic, issueFile, queueItem, uiSettings) => {
      return {
        comic,
        issueFile,
        queueItem,
        ...calendarOptions,
        timeFormat: uiSettings.timeFormat,
        longDateFormat: uiSettings.longDateFormat,
        colorImpairedMode: uiSettings.enableColorImpairedMode
      };
    }
  );
}

export default connect(createMapStateToProps)(AgendaEvent);

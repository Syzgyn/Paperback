import _ from 'lodash';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createUISettingsSelector from 'Store/Selectors/createUISettingsSelector';
import IssueAiring from './IssueAiring';

function createMapStateToProps() {
  return createSelector(
    createUISettingsSelector(),
    (uiSettings) => {
      return _.pick(uiSettings, [
        'shortDateFormat',
        'showRelativeDates',
        'timeFormat'
      ]);
    }
  );
}

export default connect(createMapStateToProps)(IssueAiring);

import _ from 'lodash';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createUISettingsSelector from 'Store/Selectors/createUISettingsSelector';
import IssueReleaseInfo from './IssueReleaseInfo';

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

export default connect(createMapStateToProps)(IssueReleaseInfo);

